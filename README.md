# book-record-management

Creating a book record managment API Backend for the management of records and books

# Routes and Endpoints

## /users

POST: Create a new users ✅
GET: Get all list of users ✅

## /users/{id}

GET: Get a user by ID ✅
PUT: Update a user by ID ✅
DELETE: Delete a user by ID (check if he/she still has an issued book) (is there any fine to be paid)

## /users/subscriptions-details/{id}

GET: Get users subscription details

1. Date of Subscription
2. Valid till
3. Fine iif any

## /books

GET: Get all books ✅
POST: Create/add a new book ✅

## /books/{id}

GET: Get a book by ID ✅
PUT: update a book by ID ✅

## /books/issued/by-user

GET: Get all issued books ✅

## /books/issued/withFine

GET: Get all issued books with fine

# Subscription Types

1. Basic (3 months)
2. Standard (6 months)
3. Premium (12 months)

//days are in format mm/dd/yyyy

if the subscription date is 01/08/22
and subscription type is Standard
the valid till date will be 01/02/23

If he has an isuued book and the issued book is to be returned at 01/01/23
If he missed the date of return, the he gets a fine of Rs. 100./

If he has n isuued book and the issued book is to be returned at 01/01/23
If he missed the date of return, and his subscription also expires, the he will get a fine of Rs 200./
