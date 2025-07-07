# Set up
Assuming Docker and Kubernetes are installed:
1. Build the Docker image: Run ```docker build -t <name-of-your-choice>:<tag-of-your-choice> .```
2. Start Minikube (my chosen control plane): ```minikube start```
3. Load local Docker image into minikube: ```minikube image load <docker-img-name>:<tag>```
4. Create a pod/deployment/replicaset/whatever and make sure to set ```imagePullPolicy: Never``` so you avoid Image Not Found error or Image Pull Error. In my case, I have provided the deployment file. To create it: ```kubectl create -f deployment.yaml```