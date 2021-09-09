build_app:
	npm run build

upload_app:
	7z a -tzip build.zip build
	pscp build.zip flasherup@212.227.215.17:/home/flasherup/

update_app:
	ssh flasherup@212.227.215.17 "sudo -S unzip build.zip && sudo rm -rf /var/www/html/lib && sudo mkdir /var/www/html/lib && sudo mv build/* /var/www/html/lib/ && rm -r build"

deploy_app:
	make build_app
	make upload_app
	make update_app