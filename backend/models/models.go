package models

import "github.com/jinzhu/gorm"

type Story struct {
	gorm.Model
	Title    string    `json:"title" binding:"required"`
	Content  string    `json:"content" binding:"required"`
	Username string    `json:"reviewer" binding:"required" gorm:"foreignkey:username"`
	Reviews  []*Review `json:"reviews" gorm:"foreignkey:StoryID"`
}

type Review struct {
	ReviewID int    `gorm:"primary_key"`
	Title    string `json:"title" binding:"required"`
	Score    uint   `json:"score" binding:"required"`
	Username string `json:"reviewer" binding:"required" gorm:"ForeignKey:username"`
	StoryID  int
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
	Password string  `json:"-" binding:"required"`
	Likes    []*Book `json:"likes" gorm:"many2many:user_likes;association_foreignkey:user_id;association_foreignkey:ISBN;"`
	Dislikes []*Book `json:"dislikes" gorm:"many2many:user_dislikes;association_foreignkey:user_id;association_foreignkey:ISBN;"`
}

type Book struct {
	ISBN        string `json:"ISBN" binding:"required" gorm:"unique_index"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
}
