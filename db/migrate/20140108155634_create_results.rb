class CreateResults < ActiveRecord::Migration
  def change
    create_table :results do |t|
      t.integer :study_id
      t.text :results

      t.timestamps
    end
  end
end
