class AddPresentationUpload < ActiveRecord::Migration
  def change
    add_column :studies, :presentation, :string
  end
end
