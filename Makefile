PROJECT = "cdz-swap"
REGISTRY = "harbor.ginfex.net:5000/ex-web"
-include Makefile.env

.PHONY: all build clean

# 编译+发布
all:
	git pull
	yarn
	npm run build
	docker build -t "$(REGISTRY)/$(PROJECT):$(TAG)" -t "$(REGISTRY)/$(PROJECT):$(VERSION)" ./
	docker push $(REGISTRY)/$(PROJECT)
	rm -fr ./$(PROJECT)

clean:
	@echo "        Cleaning up..."
	rm -fr ./$(PROJECT)
