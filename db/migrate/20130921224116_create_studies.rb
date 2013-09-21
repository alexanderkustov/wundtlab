class CreateStudies < ActiveRecord::Migration
  def change
    create_table :studies do |t|
      t.string :name
      t.text :description
      t.string :study_link

      t.timestamps
    end
  end
end
