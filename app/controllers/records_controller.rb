class RecordsController < ApplicationController

	def index
		query = params[:query]
    #@records = Record.where('title LIKE ? OR place LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%", "%#{query}%")
    @records = Record.where('title LIKE ?', "%#{query}%")
    #render json: @records
  end

	def create
	  @records = Record.create(record_params)
		if @records.save
		  render json: @records
		else
		  render nothing: true, status: :bad_request
		end
	end

	private

	  def record_params
	    params.require(:record).permit(:title, :date, :amount)
	  end
end
