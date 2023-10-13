build-qa:
	aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 097170304260.dkr.ecr.ap-southeast-1.amazonaws.com
	docker build -t qa-flowech-website .

push-qa:
	docker tag qa-flowech-website:latest 097170304260.dkr.ecr.ap-southeast-1.amazonaws.com/qa-flowech-website:latest
	docker push 097170304260.dkr.ecr.ap-southeast-1.amazonaws.com/qa-flowech-website:latest

deploy-qa:
	aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 097170304260.dkr.ecr.ap-southeast-1.amazonaws.com
	docker build -t qa-flowech-website .
	docker tag qa-flowech-website:latest 097170304260.dkr.ecr.ap-southeast-1.amazonaws.com/qa-flowech-website:latest
	docker push 097170304260.dkr.ecr.ap-southeast-1.amazonaws.com/qa-flowech-website:latest