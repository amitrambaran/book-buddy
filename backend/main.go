package main

import (
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"

	"fmt"

	"./models"

	"github.com/gin-contrib/cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

var db *gorm.DB
var err error
var dbUri string

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
	fmt.Println(dbUri)

	db, err = gorm.Open("postgres", dbUri)
	if err != nil {
		fmt.Print(err)
	}
	db.Debug().Set("gorm:auto_preload", true)
	gin.SetMode(gin.ReleaseMode)

	db.Debug().AutoMigrate(&models.User{}, &models.Book{}, &models.Story{}, &models.Review{})
}

func main() {
	router := gin.Default()

	router.Use(cors.Default())

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

func getDB() {
	err = db.Debug().DB().Ping()
	if err != nil {
		db, err = gorm.Open("postgres", dbUri)
		if err != nil {
			fmt.Print(err)
		}
		defer db.Debug().Close()
	}
}

func AddReviewHandler(c *gin.Context) {
	getDB()
	var err error
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid story id"})
		return
	}
	var form models.ReviewForm
	err = c.BindJSON(&form)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid review form"})
		return
	}
	story := new(models.Story)
	db.Debug().Where("id = ?", id).Find(story)
	if story.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid Story"})
		return
	}
	db.Debug().Model(story).Association("Reviews").Append(&models.Review{Comment: form.Comment, Reviewer: form.Reviewer, Score: form.Score})
	c.Status(200)
}

func GetUserNameHandler(c *gin.Context) {
	getDB()
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid user id"})
		return
	}
	user := new(models.User)
	db.Debug().Where("id=?", id).Find(&user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid user"})
		return
	}
	c.JSON(200, gin.H{"username": user.Username})
}

func GetUserStoriesHandler(c *gin.Context) {
	getDB()
	username := c.Param("username")
	var stories []*models.Story
	db.Debug().Preload("Reviews").Where("author = ?", username).Find(&stories)
	c.JSON(200, gin.H{"stories": stories})
}

func GetNewStoriesHandler(c *gin.Context) {
	getDB()
	n, err := strconv.Atoi(c.Param("n"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid quantity amount"})
		return
	}
	if n > 12 {
		n = 12
	}
	var stories []*models.Story
	db.Debug().Preload("Reviews").Order("created_at asc").Limit(n).Find(&stories)
	c.JSON(200, gin.H{"stories": stories})
}

func GetStoriesHandler(c *gin.Context) {
	getDB()
	n, err := strconv.Atoi(c.Param("n"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid quantity amount"})
		return
	}
	if n > 12 {
		n = 12
	}
	var stories []*models.Story
	db.Debug().Preload("Reviews").Order(gorm.Expr("random()")).Limit(n).Find(&stories)
	c.JSON(200, gin.H{"stories": stories})
}

func GetStoryHandler(c *gin.Context) {
	getDB()
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid Story id"})
		return
	}
	var story models.Story
	db.Debug().Preload("Reviews").Where("id = ?", id).First(&story)
	if story.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid Story ID"})
		return
	}
	c.JSON(200, gin.H{"story": story})
}

func AddStoryHandler(c *gin.Context) {
	getDB()
	form := new(models.StoryForm)
	err := c.BindJSON(form)
	if err != nil {
		c.JSON(400, gin.H{"message": "Invalid story form"})
		return
	}
	var story models.Story
	db.Debug().Preload("Reviews").Where("title = ? AND author = ?", form.Title, form.Author).FirstOrCreate(&story, &models.Story{Author: form.Author, Title: form.Title, Content: form.Content, Cover: form.Cover})
	c.JSON(200, gin.H{"story": story})
}

func DislikeBookHandler(c *gin.Context) {
	getDB()
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
	db.Debug().Where("id=?", id).Find(user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid user"})
		return
	}
	db.Debug().Model(user).Association("Disikes").Append(&models.Book{ISBN: form.ISBN, Title: form.Title, Cover: form.Cover})
	c.Status(200)
}

func LikeBookHandler(c *gin.Context) {
	getDB()
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
	db.Debug().Where("id=?", id).Find(user)
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid user"})
		return
	}
	db.Debug().Model(user).Association("Likes").Append(&models.Book{ISBN: form.ISBN, Title: form.Title, Cover: form.Cover})
	c.Status(200)
}

func LoginRegisterHandler(c *gin.Context) {
	getDB()
	form := new(models.UserForm)
	err := c.BindJSON(form)
	if err != nil {
		c.AbortWithStatusJSON(400, gin.H{"message": http.StatusBadRequest})
		return
	}
	var user models.User
	db.Debug().Preload("Likes").Preload("Dislikes").Where("username = ? AND password = ?", form.Username, form.Password).FirstOrCreate(&user, &models.User{Username: form.Username, Password: form.Password})
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid credentials"})
		return
	}
	c.JSON(200, gin.H{"user": user})
}
