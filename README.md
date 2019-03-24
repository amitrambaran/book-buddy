# Book Buddy

The only book app you will ever need!

# Overview

A web application which provides an all-access hub for people to keep track of what they’ve read, receive recommendations on similar books, branching out to new genres. Our platform also offers an opportunity for small/independant authors to publish their works to assist in gaining exposure.

# Goal

The target of Book Buddy can be anywhere from casual readers to full time students. It is a centralized hub for people who need information on specific books, are looking for new ones, or want to take a newly found hobby a little more seriously. It is a one-stop shop for published literature.

# Functionality & Impact

## User Account
Ability to subscribe to authors and receive notifications when new books are released.
Keep track of books that the user has read.
Publish and showcase user created independent works. (A hub to give exposure to new and upcoming authors.)
Built-in book reader.
Ability to upload your own epubs to read everywhere.
Able to purchase interested/suggested books from Amazon.

## Book Database
Users can search the database of Open-Library books based on the following criteria:
ISBN
Title
Author
Publisher
Genre

## Interactivity
Users can rate the books, write reviews and send recommendations to friends on social media. 

## Additional Features
Forums for community interaction and discussion
Random Book Generator
Location based recommendations (country, city, area).
Suggest user similar books or new-finds based on author or subject preference.
Section with the NY-Times Best Sellers in Fiction/Non-Fiction.

## Framework considerations
Frontend: 
* React
* Semantic UI
* React-Bootstrap: https://react-bootstrap.github.io/components/alerts/

## Backend
REST API: 
* GO
* Node

## Web Hosting
* Heroku
* Digital Ocean servlet

# Backend Development
## Prerequisites
* Install GoLang
* Install docker-compose

## Instructions (In seperate terminals)
1. docker-compose up
2. go run main.go

# How to Start Developing
## Installation Requirements
* NodeJS

1. Clone this repo
2. npm install
3. npm run build
4. npm run start

# Sources and References
https://openlibrary.org/developers/api
https://docs.aws.amazon.com/AWSECommerceService/latest/DG/EX_LookupbyISBN.html
https://developer.nytimes.com
https://opendata.tpl.ca
https://developers.google.com/maps/documentation/geolocation/intro
