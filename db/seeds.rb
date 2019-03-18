# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create educators
5.times do
  first_name = Faker::Name.first_name
  educator = Educator.create(first_name: first_name,
                             last_name:  Faker::Name.last_name,
                             email:      Faker::Internet.unique.safe_email(first_name),
                             password:   Faker::Internet.password)
end

# create courses
20.times do
  Educator.all.each do |educator|
    description = Faker::MichaelScott.quote +
                  " " + Faker::Lorem.sentence(2, true)
    Course.create(name: Faker::Educator.course,
                  educator: educator,
                  description: description)
  end
end

# create students
30.times do
  first_name = Faker::Name.first_name
  Student.create(first_name: first_name,
                 last_name:  Faker::Name.last_name,
                 email:      Faker::Internet.unique.safe_email(first_name),
                 password:   Faker::Internet.password)
end

# follow students
Student.all.each do |student|
  Course.all.each do |course|
    if (rand < 0.5)
      Students::FollowCourseService.new(student, course).execute
    end
  end
end