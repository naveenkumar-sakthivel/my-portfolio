# Kubernetes Deployment Guide - Naveen Kumar Portfolio

This document explains how to deploy the **Naveen Kumar Portfolio** application to a Kubernetes cluster.

The application consists of:
- A Node.js + Express backend
- Static frontend files served from the backend
- A contact form that sends email using Nodemailer
- Kubernetes resources for deployment and service exposure

---

## Architecture

The deployment includes:

- **Deployment** for the Node.js portfolio app
- **Service** for internal cluster access
- **Secret** for email credentials
- **Traefik Ingress Controller** for external routing
- **cert-manager** for automatic TLS certificate provisioning
---

## Prerequisites

Before starting, ensure you have:

- A running Kubernetes cluster
- `kubectl` configured
- Helm installed
- A Docker image pushed to a container registry
- A registered domain name pointing to your cluster ingress IP
- Gmail App Password for the contact form backend

---

## Folder Structure

Recommended Kubernetes manifest structure:

```bash
project-root/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── main.js
├── data/
│   └── projects.json
├── server.js
├── Dockerfile
├── package.json
├── .env
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── secret.yaml
│   ├── ingress.yaml
│   ├── cluster-issuer.yaml
│   └── namespace.yaml
└── README.md
```

---

## Docker Image

Build and push your Docker image before deploying:

```bash
docker build -t your-dockerhub-username/naveen-portfolio:latest .
docker push your-dockerhub-username/naveen-portfolio:latest
```

Replace the image name in the Kubernetes manifests with your actual image.

---

## Kubernetes Secret

Create a secret to store mail credentials securely.

```bash
kubectl apply -f k8s/secret.yaml
```

---

## Deployment

```bash
kubectl apply -f k8s/deployment.yaml
```

---

## Service

Expose the application internally in the cluster.

```bash
kubectl apply -f k8s/service.yaml
```

---

## Traefik Ingress

To Install the Traefik Ingress as Helm chart

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm upgrade --install traefik traefik/traefik --namespace traefik --create-namespace 
```
To expose the application using domain name

```bash
kubectl apply -f k8s/ingress.yaml
```
Verify installation:

```bash
kubectl get pods -n traefik
kubectl get svc -n traefik
```
You should see a LoadBalancer service. Get the external IP:

```bash
kubectl get svc -n traefik
```

Point your domain DNS record to this external IP.

---
## Install cert-manager

Add the cert-manager Helm repository:

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
```

Install cert-manager with CRDs:

```bash
helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --create-namespace \
  --set crds.enabled=true
```

Verify installation:

```bash
kubectl get pods -n cert-manager
```

---
## Create ClusterIssuer

This ClusterIssuer uses Let’s Encrypt for TLS certificates.

### `k8s/cluster-issuer.yaml`

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: your-email@example.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-key
    solvers:
      - http01:
          ingress:
            class: traefik
```

Apply it:

```bash
kubectl apply -f k8s/cluster-issuer.yaml
```

Verify:

```bash
kubectl get clusterissuer
```

---

## Apply All Resources

Run the manifests in this order:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/cluster-issuer.yaml
kubectl apply -f k8s/ingress.yaml
```

---


## 11. Verify the Deployment

Check all resources:

```bash
kubectl get pods -n portfolio
kubectl get deployments -n portfolio
kubectl get svc -n portfolio
kubectl get ingress -n portfolio
kubectl get certificate -n portfolio
kubectl get certificaterequests -n portfolio
```
---

## Test the Application

### Port Forward (Quick Test)

If you don’t have Ingress configured yet, use port-forwarding:

```bash
kubectl port-forward svc/naveen-portfolio-service 8080:80
```

Open:

```text
http://localhost:8080
```

---

## Cleanup

Delete all Kubernetes resources:

```bash
kubectl delete -f k8s/ingress.yaml
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/secret.yaml
```

---

## Summary

This setup deploys your portfolio app to Kubernetes with:
- a Deployment for the app container
- a Service for internal exposure
- a Secret for mail credentials
- an optional Ingress for public access
- TLS via cert-manager
- Horizontal Pod Autoscaler
- readiness/liveness probes
- CI/CD via GitHub Actions
