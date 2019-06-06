package models

import "github.com/jinzhu/gorm"

type ReviewForm struct {
	Comment  string `json:"comment" binding:"required"`
	Reviewer string `json:"reviewer" binding:"required"`
	Score    uint   `json:"score,string" binding:"required"`
}

type StoryForm struct {
	Title   string `json:"title" binding:"required"`
	Content string `json:"content" binding:"required"`
	Author  string `json:"author" binding:"required"`
	Cover   string `json:"cover"`
}

type BookForm struct {
	ISBN  string `json:"ISBN" binding:"required"`
	Title string `json:"title" binding:"required"`
	Cover string `json:"cover" binding:"required"`
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
	Cover       string `json:"cover" binding:"required"`
}

type Story struct {
	gorm.Model
	Title   string    `json:"title" binding:"required"`
	Content string    `json:"content" binding:"required"`
	Author  string    `json:"author" binding:"required"`
	Cover   string    `json:"cover"`
	Reviews []*Review `json:"reviews" gorm:"many2many:story_reviews;association_foreignkey:story_id;association_foreignkey:id;"`
}

type Review struct {
	gorm.Model
	Comment  string `json:"comment" binding:"required"`
	Score    uint   `json:"score" binding:"required"`
	Reviewer string `json:"reviewer" binding:"required" gorm:"ForeignKey:username"`
}
