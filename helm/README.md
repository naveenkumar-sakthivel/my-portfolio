# Naveen Portfolio Helm Chart

Helm chart for deploying the **Naveen Kumar Portfolio** application on Kubernetes.

## Overview

This chart deploys:

- Deployment
- Service
- Secret
- Optional Ingress

The application is a Node.js + Express portfolio website with a contact form backend powered by Nodemailer.

## Prerequisites

- Kubernetes cluster
- Helm 3.x
- Docker image pushed to a container registry

## Chart Structure

```bash
naveen-portfolio-chart/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── _helpers.tpl
    ├── deployment.yaml
    ├── service.yaml
    ├── secret.yaml
    └── ingress.yaml
```

## Installation

```bash
helm install my-portfolio ./naveen-portfolio-chart
```

## Upgrade

```bash
helm upgrade my-portfolio ./naveen-portfolio-chart
```

## Uninstall

```bash
helm uninstall my-portfolio
```

## Configuration

The following table lists the configurable parameters in `values.yaml`.

| Parameter | Description | Default |
|---|---|---|
| `replicaCount` | Number of application replicas | `1` |
| `image.repository` | Container image repository | `your-dockerhub-username/naveen-portfolio` |
| `image.tag` | Container image tag | `latest` |
| `image.pullPolicy` | Image pull policy | `IfNotPresent` |
| `containerPort` | Container port exposed by the app | `3000` |
| `service.type` | Kubernetes Service type | `ClusterIP` |
| `service.port` | Service port | `80` |
| `service.targetPort` | Target port for the container | `3000` |
| `env.PORT` | Application port environment variable | `"3000"` |
| `secret.MAIL_USER` | Gmail user for Nodemailer | `yourgmail@gmail.com` |
| `secret.MAIL_PASS` | Gmail app password | `your_gmail_app_password` |
| `ingress.enabled` | Enable Ingress resource | `false` |
| `ingress.className` | Ingress class name | `nginx` |
| `ingress.host` | Hostname for ingress | `portfolio.yourdomain.com` |
| `ingress.path` | Ingress path | `/` |
| `ingress.pathType` | Ingress path type | `Prefix` |
| `resources.requests.cpu` | Requested CPU | `100m` |
| `resources.requests.memory` | Requested memory | `128Mi` |
| `resources.limits.cpu` | CPU limit | `250m` |
| `resources.limits.memory` | Memory limit | `256Mi` |

## Example

Install with custom image and ingress:

```bash
helm install my-portfolio ./naveen-portfolio-chart \
  --set image.repository=myrepo/naveen-portfolio \
  --set image.tag=v1 \
  --set ingress.enabled=true \
  --set ingress.host=portfolio.example.com
```

## Notes

- Do **not** store real secrets in `values.yaml` for production.
- Use separate values files for environments such as `values-dev.yaml` and `values-prod.yaml`.
- Consider integrating external secret management for production deployments.
