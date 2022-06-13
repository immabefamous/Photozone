require 'open-uri'
require 'json'
require 'net/http'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "creating users"
User.create(name: "Emmanuel", username: "unique1", password: "pass1", image: "https://i.ytimg.com/vi/_fLy6fGw0Z4/maxresdefault.jpg", subscription: true)
y = 2
while y <= 50
    puts "generating user#{y}"
    User.create(name: "placeholder", username: "unique#{y}", password: "pass#{y}", image: "https://ohmylens.com/wp-content/uploads/2017/06/dummy-profile-pic.png", subscription: false)
    y += 1
end


puts "creating picposts"
b = 1
while b <= 3
url = "https://api.unsplash.com/photos/?client_id=3MyT9v7J2-oO2smMU-C0xhMV_E-Gc2SX_2CfHx64D0E"
uri = URI.parse(url)
response = Net::HTTP.get_response(uri)
photoZoneData = JSON.parse(response.body) 

photoZoneData.each {|x| PicPost.create(
    title: x["description"],
     image: x["urls"]["regular"],
      likes: x["likes"],
       dislikes: rand(50),
        user_id: rand(50) )
        puts "created a random post"
    }
b += 1
end
puts "creating forum threads"
Forum.create(title: "Gear",
image:  "https://images.squarespace-cdn.com/content/v1/54f89a5be4b08c1630c14c74/1553462908280-V35YU8T9SP4DNWCGDD0K/DSJ_7834lrg.jpg?format=1000w",
likes: rand(50),
dislikes: rand(50),
user_id: rand(50)
)

Forum.create(title: "Clients",
image:  "https://www.cgi.com/sites/default/files/consultants-client-talking-at-table-voc-medium.jpg",
likes: rand(50),
dislikes: rand(50),
user_id: rand(50)
)

Forum.create(title: "Skill vs experience",
image:  "http://storage.ning.com/topology/rest/1.0/file/get/1557602463?profile=RESIZE_320x320",
likes: rand(50),
dislikes: rand(50),
user_id: rand(50)
)

puts "creating forum post for each thread"
z = 1
while z <= 10
ForumPost.create(textarea: "place holder", image: "https://ohmylens.com/wp-content/uploads/2017/06/dummy-profile-pic.png", user_id: rand(50), forum_id:rand(3))
z += 1
end

puts "greating comments for the posts"
a = 1
while a <= 25
Comment.create(comment: "this is a nice picture", user_id: rand(50), pic_post_id: rand(30))
a += 1
end

puts "finished seeds generic data"



