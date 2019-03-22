package main

import (
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"

	"fmt"

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
	db.Debug().DropTableIfExists(&User{}, &Book{})

	db.Debug().AutoMigrate(&User{}, &Book{})

	defer db.Close()
}

func main() {
	router := gin.Default()

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
		api.POST("/login", LoginHandler)
		api.POST("/register", RegisterHandler)
	}

	router.Run(":3000")
}

type BookForm struct {
	ISBN  string `json:"ISBN" binding:"required"`
	Title string `json:"title" binding:"required"`
}

type UserForm struct {
	Username string `form:"username" binding:"required"`
	Password string `form:"password" binding:"required"`
}

type User struct {
	gorm.Model
	Username string  `json:"username" binding:"required" gorm:"unique_index"`
	Password string  `json:"password" binding:"required"`
	Likes    []*Book `json:"likes" gorm:"many2many:user_likes;association_foreignkey:user_id;association_foreignkey:ISBN;"`
	Dislikes []*Book `json:"dislikes" gorm:"many2many:user_dislikes;association_foreignkey:user_id;association_foreignkey:ISBN;"`
}

type Book struct {
	ISBN  string `json:"ISBN" binding:"required" gorm:"unique_index"`
	Title string `json:"title"`
}

func GetUserNameHandler(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, "Invalid user id")
		return
	}
	user := new(User)
	db.Where("id=?", id).Find(&user)
	if user.ID == 0 {
		c.JSON(404, "Invalid user")
		return
	}
	c.JSON(200, gin.H{"username": user.Username})
}

func DislikeBookHandler(c *gin.Context) {
	var err error
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, "Invalid user id")
		return
	}
	form := new(BookForm)
	err = c.BindJSON(form)
	if err != nil {
		c.JSON(400, "Invalid user book form")
		return
	}
	user := new(User)
	db.Where("id=?", id).Find(&user)
	if user.ID == 0 {
		c.JSON(404, "Invalid user")
		return
	}
	db.Model(&user).Association("Disikes").Append(&Book{ISBN: form.ISBN, Title: form.Title})
	c.Status(200)
}

func LikeBookHandler(c *gin.Context) {
	var err error
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, "Invalid user id")
		return
	}
	form := new(BookForm)
	err = c.BindJSON(form)
	if err != nil {
		c.JSON(400, "Invalid user book form")
		return
	}
	user := new(User)
	db.Where("id=?", id).Find(&user)
	if user.ID == 0 {
		c.JSON(404, "Invalid user")
		return
	}
	db.Model(&user).Association("Likes").Append(&Book{ISBN: form.ISBN, Title: form.Title})
	c.Status(200)
}

func LoginHandler(c *gin.Context) {
	form := new(UserForm)
	err := c.BindJSON(form)
	if err != nil {
		c.AbortWithStatus(400)
		return
	}
	user := new(User)
	fmt.Println(form.Username)
	db.Debug().Where("username = ?", form.Username).Find(&user)
	fmt.Println(user)
	if user.ID == 0 {
		c.JSON(404, "Invalid user")
		return
	}
	if user.Password != form.Password {
		c.JSON(404, "Invalid credentials")
		return
	}
	c.JSON(200, gin.H{"user": user})
}

func RegisterHandler(c *gin.Context) {
	form := new(UserForm)
	err := c.BindJSON(form)
	if err != nil {
		c.AbortWithStatusJSON(400, http.StatusBadRequest)
		return
	}
	user := &User{Username: form.Username, Password: form.Password}
	db.Debug().Save(user)
	if user.ID == 0 {
		c.JSON(400, "User already  exists")
		return
	}
	c.JSON(200, gin.H{"user": user})
}
