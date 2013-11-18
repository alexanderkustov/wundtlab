class Study < ActiveRecord::Base
  attr_accessible :description, :name, :study_link, :presentation
  belongs_to :user
  mount_uploader :presentation, PresentationUploader
end
