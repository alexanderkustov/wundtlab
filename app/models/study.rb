class Study < ActiveRecord::Base
  attr_accessible :description, :name, :study_link
  belongs_to :user
end
