package main

import (
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"fmt"

	"./models"

	"github.com/gin-contrib/cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

var db *gorm.DB

func init() {
	e := godotenv.Load()
	if e != nil {
		fmt.Print(e)
	}

	username := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")

	dbUri := fmt.Sprintf("host=%s user=%s dbname=%s password=%s sslmode=disable", dbHost, username, dbName, password)

	var err error
	db, err = gorm.Open("postgres", dbUri)
	if err != nil {
		fmt.Print(err)
	}
	db.Set("gorm:auto_preload", true)
	gin.SetMode(gin.ReleaseMode)

	db.AutoMigrate(&models.User{}, &models.Book{}, &models.Story{}, &models.Review{})
}

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.Use(static.Serve("/", static.LocalFile("../build", true)))
	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
		api.POST("/like/:id", LikeBookHandler)
		api.POST("/dislike/:id", DislikeBookHandler)
		api.GET("/username/:id", GetUserNameHandler)
		api.POST("/login", LoginRegisterHandler)
		api.POST("/story", AddStoryHandler)
		api.GET("/story/:id", GetStoryHandler)
		api.GET("/stories/:n", GetStoriesHandler)
		api.GET("/userstories/:username", GetUserStoriesHandler)
		api.GET("/newstories/:n", GetStoriesHandler)
		api.POST("/review/:id", AddReviewHandler)
	}

	router.Run(":8080")
}

func AddReviewHandler(c *gin.Context) {
	var err error
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid story id"})
		return
	}
	form := new(models.ReviewForm)
	err = c.BindJSON(form)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid review form"})
		return
	}
	story := new(models.Story)
	db.Where("id = ?", id).Find(story)
	if story.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid Story"})
		return
	}
	db.Model(story).Association("Reviews").Append(&models.Review{Comment: form.Comment, Reviewer: form.Reviewer, Score: form.Score})
	c.Status(200)
}

func GetUserNameHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid user id"})
		return
	}
	user := new(models.User)
	db.Where("id=?", id).Find(&user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid user"})
		return
	}
	c.JSON(200, gin.H{"username": user.Username})
}

func GetUserStoriesHandler(c *gin.Context) {
	username := c.Param("username")
	var stories []*models.Story
	db.Preload("Reviews").Where("author = ?", username).Find(&stories)
	c.JSON(200, gin.H{"stories": stories})
}

func GetNewStoriesHandler(c *gin.Context) {
	n, err := strconv.Atoi(c.Param("n"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid quantity amount"})
		return
	}
	if n > 10 {
		n = 10
	}
	var stories []*models.Story
	db.Preload("Reviews").Order("updated_at desc").Limit(n).Find(&stories)
	c.JSON(200, gin.H{"stories": stories})
}

func GetStoriesHandler(c *gin.Context) {
	n, err := strconv.Atoi(c.Param("n"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid quantity amount"})
		return
	}
	if n > 10 {
		n = 10
	}
	var stories []*models.Story
	db.Preload("Reviews").Order(gorm.Expr("random()")).Limit(n).Find(&stories)
	c.JSON(200, gin.H{"stories": stories})
}

func GetStoryHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Story id"})
		return
	}
	var story models.Story
	db.Preload("Reviews").Where("id = ?", id).First(&story)
	if story.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid Story ID"})
		return
	}
	c.JSON(200, gin.H{"story": story})
}

func AddStoryHandler(c *gin.Context) {
	form := new(models.StoryForm)
	err := c.BindJSON(form)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid story form"})
		return
	}
	var story models.Story
	db.Preload("Reviews").Where("title = ? AND author = ?", form.Title, form.Author).FirstOrCreate(&story, &models.Story{Author: form.Author, Title: form.Title, Content: form.Content})
	c.JSON(200, gin.H{"story": story})
}

func DislikeBookHandler(c *gin.Context) {
	var err error
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid user id"})
		return
	}
	form := new(models.BookForm)
	err = c.BindJSON(form)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid user book form"})
		return
	}
	user := new(models.User)
	db.Where("id=?", id).Find(user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid user"})
		return
	}
	db.Model(user).Association("Disikes").Append(&models.Book{ISBN: form.ISBN, Title: form.Title})
	c.Status(200)
}

func LikeBookHandler(c *gin.Context) {
	var err error
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid user id"})
		return
	}
	form := new(models.BookForm)
	err = c.BindJSON(form)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid user book form"})
		return
	}
	user := new(models.User)
	db.Where("id=?", id).Find(user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid user"})
		return
	}
	db.Model(user).Association("Likes").Append(&models.Book{ISBN: form.ISBN, Title: form.Title})
	c.Status(200)
}

func LoginRegisterHandler(c *gin.Context) {
	form := new(models.UserForm)
	err := c.BindJSON(form)
	if err != nil {
		c.AbortWithStatusJSON(400, gin.H{"message": http.StatusBadRequest})
		return
	}
	var user models.User
	db.Preload("Likes").Preload("Dislikes").Where("username = ? AND password = ?", form.Username, form.Password).FirstOrCreate(&user, &models.User{Username: form.Username, Password: form.Password})
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid credentials"})
		return
	}
	c.JSON(200, gin.H{"user": user})
}
