# Box Drop

We used created a rails-app with file upload functionality that utilizes S3 for storage.

## Collecting Files
Users can login through our website or Google and then upload files from their personal computer onto our website.  When a user uploads a file they have the option to decide if it will be password protected or not.


## Retrieving Files
Users can retrieve their files by clicking the download icon and entering the correct password (if the owner chose to have one).


## Setup Instructions
Run these commands in this order:
```
git clone git@github.com:DavidKnott/drop-it-like-its-hot.git
cd drop-it-like-its-hot
bundle
rails db:create
rails db:migrate
rails db:test:prepare
```

## Deployment instructions
To launch the project on local host, start up the rails server and visit the root path.
```
rails s
```

## How to Run the Test Suite
Run rspec from the command line:
```
rspec
```

## Tools/Technologies used
* Git/GitHub
* Waffle.io
* HTML, CSS, Bootstrap
* Ruby on rails and ERB templates
* ActiveRecord
* PostgreSQL
* Rspec
* Capybara
* AWS S3
* Jquery

## Project Team
[Eric](https://github.com/cews7), [David](https://github.com/DavidKnott), [Ethan](https://github.com/ethanbennett), [Laszlo](https://github.com/Laszlo-JFLMTCO)
