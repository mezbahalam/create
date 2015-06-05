module ApplicationHelper
	def payment_method(payment)
		unless payment.stripe_customer_id.blank?
			"Stripe Customer Id :  " + payment.stripe_customer_id
		else
			"Paypal Email : " + payment.user_email
		end
	end
end
