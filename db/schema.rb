# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_04_225732) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.bigint "deck_id"
    t.text "front"
    t.text "back"
    t.float "easiness"
    t.integer "consecutive_correct_answers"
    t.datetime "next_due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["deck_id"], name: "index_cards_on_deck_id"
  end

  create_table "course_user_relationships", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_user_relationships_on_course_id"
    t.index ["user_id"], name: "index_course_user_relationships_on_user_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.integer "educator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["educator_id"], name: "index_courses_on_educator_id"
  end

  create_table "decks", force: :cascade do |t|
    t.bigint "course_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_decks_on_course_id"
  end

  create_table "educator_student_relationships", force: :cascade do |t|
    t.integer "student_id"
    t.integer "educator_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["student_id", "educator_id"], name: "educator_student_index"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "type"
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "cards", "decks"
  add_foreign_key "course_user_relationships", "courses"
  add_foreign_key "course_user_relationships", "users"
  add_foreign_key "decks", "courses"
end