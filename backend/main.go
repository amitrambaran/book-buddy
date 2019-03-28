package main

import (
	"net/http"
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

func init() {
	e := godotenv.Load()
	if e != nil {
		fmt.Print(e)
	}

	// username := os.Getenv("DB_USER")
	// password := os.Getenv("DB_PASSWORD")
	// dbName := os.Getenv("DB_NAME")
	// dbHost := os.Getenv("DB_HOST")

	username := "postgres"
	password := "example"
	dbName := "postgres"
	dbHost := "localhost"

	dbUri := fmt.Sprintf("host=%s user=%s dbname=%s password=%s sslmode=disable", dbHost, username, dbName, password)

	var err error
	db, err = gorm.Open("postgres", dbUri)
	if err != nil {
		fmt.Print(err)
	}
	db.Set("gorm:auto_preload", true)

	db.Debug().DropTableIfExists(&models.User{}, &models.Book{}, &models.Story{}, &models.Review{})

	db.Debug().AutoMigrate(&models.User{}, &models.Book{}, &models.Story{}, &models.Review{})
	// db.Model(&models.Story{}).AddForeignKey("username", "users(username)", "CASCADE", "CASCADE")
	// db.Model(&models.Story{}).AddForeignKey("story_id", "stories(id)", "CASCADE", "CASCADE")

	// db.Model(&models.Review{}).AddForeignKey("username", "users(username)", "CASCADE", "CASCADE")
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
	}

	router.Run(":8080")
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
	db.Debug().Preload("Likes").Preload("Dislikes").Where("username = ? AND password = ?", form.Username, form.Password).FirstOrCreate(&user, &models.User{Username: form.Username, Password: form.Password})
	if user.ID == 0 {
		c.JSON(404, gin.H{"message": "Invalid credentials"})
		return
	}
	c.JSON(200, gin.H{"user": user})
}
