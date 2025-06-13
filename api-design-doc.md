# GenAI ChatOps API Design Document

This document outlines the API design for the GenAI ChatOps platform based on the UI mockup. The API is designed to support all the functionality shown in the UI, including dashboard metrics, RAG tuning, knowledge base management, MCP server configuration, workflows, guardrails, and analytics.

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Core APIs](#core-apis)
   - [Dashboard API](#dashboard-api)
   - [RAG Tuning API](#rag-tuning-api)
   - [Knowledge Base API](#knowledge-base-api)
   - [MCP Servers API](#mcp-servers-api)
   - [Workflows API](#workflows-api)
   - [Guardrails API](#guardrails-api)
   - [Analytics API](#analytics-api)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [Versioning](#versioning)
7. [Rate Limiting](#rate-limiting)

## API Overview

The GenAI ChatOps API is a RESTful API that follows standard HTTP conventions. All endpoints return JSON responses and accept JSON payloads for POST, PUT, and PATCH requests.

**Base URL**: `/api/v1`

## Authentication & Authorization

All API endpoints require authentication using JWT tokens. The token should be included in the `Authorization` header using the Bearer scheme.

```
Authorization: Bearer <token>
```

Role-based access control (RBAC) is implemented to restrict access to certain endpoints based on user roles.

## Core APIs

### Dashboard API

#### Get Dashboard Overview

Retrieves all metrics and data needed for the dashboard overview.

**Endpoint**: `GET /dashboard`

**Response**:
```json
{
  "metrics": {
    "totalPrompts": 12847,
    "activeUsers": 2350,
    "avgResponseTime": 1.8,
    "successRate": 98.2,
    "promptsGrowth": 20.1,
    "usersGrowth": 180,
    "responseTimeChange": -0.3,
    "successRateChange": 0.5
  },
  "systemStatus": {
    "mcpServers": {
      "total": 5,
      "online": 5
    },
    "connectors": {
      "total": 4,
      "active": 3
    },
    "ragPerformance": 92
  },
  "recentActivity": [
    {
      "type": "workflow_deployment",
      "description": "New workflow deployed",
      "timestamp": "2025-06-11T08:46:08Z"
    },
    {
      "type": "connector_update",
      "description": "Slack connector updated",
      "timestamp": "2025-06-11T08:33:08Z"
    },
    {
      "type": "rag_tuning",
      "description": "RAG tuning completed",
      "timestamp": "2025-06-11T07:48:08Z"
    }
  ],
  "usageData": [
    {
      "name": "Mon",
      "prompts": 120,
      "responses": 115
    },
    {
      "name": "Tue",
      "prompts": 190,
      "responses": 185
    },
    {
      "name": "Wed",
      "prompts": 300,
      "responses": 290
    },
    {
      "name": "Thu",
      "prompts": 280,
      "responses": 275
    },
    {
      "name": "Fri",
      "prompts": 350,
      "responses": 340
    },
    {
      "name": "Sat",
      "prompts": 200,
      "responses": 195
    },
    {
      "name": "Sun",
      "prompts": 150,
      "responses": 145
    }
  ],
  "topicData": [
    {
      "name": "CI/CD",
      "value": 35,
      "color": "#8884d8"
    },
    {
      "name": "Kubernetes",
      "value": 25,
      "color": "#82ca9d"
    },
    {
      "name": "Database",
      "value": 20,
      "color": "#ffc658"
    },
    {
      "name": "Security",
      "value": 12,
      "color": "#ff7300"
    },
    {
      "name": "Other",
      "value": 8,
      "color": "#00ff00"
    }
  ],
  "responseTimeData": [
    {
      "time": "00:00",
      "avgTime": 1.2
    },
    {
      "time": "04:00",
      "avgTime": 0.8
    },
    {
      "time": "08:00",
      "avgTime": 2.1
    },
    {
      "time": "12:00",
      "avgTime": 1.8
    },
    {
      "time": "16:00",
      "avgTime": 2.5
    },
    {
      "time": "20:00",
      "avgTime": 1.4
    }
  ]
}
```

### RAG Tuning API

#### Get RAG Overview

Retrieves the overview of the RAG system configuration.

**Endpoint**: `GET /rag/overview`

**Response**:
```json
{
  "status": "active",
  "performance": {
    "retrievalAccuracy": 92.5,
    "generationQuality": 89.3,
    "overallScore": 90.8
  },
  "lastTuned": "2025-06-10T15:30:00Z",
  "knowledgeSources": 8,
  "totalDocuments": 26739,
  "embeddingModel": "text-embedding-3-large",
  "generationModel": "gpt-4o",
  "chunkSize": 512,
  "chunkOverlap": 50
}
```

#### Get Retriever Configuration

Retrieves the current retriever configuration.

**Endpoint**: `GET /rag/retriever`

**Response**:
```json
{
  "embeddingModel": "text-embedding-3-large",
  "vectorStore": "pinecone",
  "indexName": "knowledge-base-index",
  "dimensions": 1536,
  "similarityMetric": "cosine",
  "retrievalMethod": "hybrid",
  "topK": 5,
  "reranking": {
    "enabled": true,
    "model": "cohere-rerank-english-v2.0",
    "threshold": 0.7
  },
  "filters": [
    {
      "field": "metadata.source",
      "operator": "in",
      "values": ["github", "confluence", "slack"]
    },
    {
      "field": "metadata.date",
      "operator": "gte",
      "value": "2024-01-01"
    }
  ],
  "chunking": {
    "method": "recursive",
    "chunkSize": 512,
    "chunkOverlap": 50
  }
}
```

#### Update Retriever Configuration

Updates the retriever configuration.

**Endpoint**: `PUT /rag/retriever`

**Request Body**:
```json
{
  "embeddingModel": "text-embedding-3-large",
  "vectorStore": "pinecone",
  "indexName": "knowledge-base-index",
  "dimensions": 1536,
  "similarityMetric": "cosine",
  "retrievalMethod": "hybrid",
  "topK": 5,
  "reranking": {
    "enabled": true,
    "model": "cohere-rerank-english-v2.0",
    "threshold": 0.7
  },
  "filters": [
    {
      "field": "metadata.source",
      "operator": "in",
      "values": ["github", "confluence", "slack"]
    },
    {
      "field": "metadata.date",
      "operator": "gte",
      "value": "2024-01-01"
    }
  ],
  "chunking": {
    "method": "recursive",
    "chunkSize": 512,
    "chunkOverlap": 50
  }
}
```

**Response**: `200 OK`

#### Get Generator Configuration

Retrieves the current generator configuration.

**Endpoint**: `GET /rag/generator`

**Response**:
```json
{
  "model": "gpt-4o",
  "temperature": 0.7,
  "maxTokens": 2000,
  "responseTemplates": [
    {
      "id": "software-engineer",
      "name": "Software Engineer Template",
      "isDefault": true,
      "template": "{% if action_requires_admin_permission %}\nPlease contact DevOps for {{ action }}. Meanwhile, you can {{ read_only_instructions }}.\n\nFor more information, check the documentation at {{ documentation_link }}.\n{% else %}\nYou can perform {{ action }} by following these steps:\n\n1. {{ step_1 }}\n2. {{ step_2 }}\n3. {{ step_3 }}\n\nFor more details, see {{ documentation_link }}.\n{% endif %}"
    },
    {
      "id": "devops-engineer",
      "name": "DevOps Engineer Template",
      "isDefault": true,
      "template": "You can perform {{ action }} directly by running:\n\n```bash\n{{ command }}\n```\n\n{% if has_caution %}\n⚠️ **Caution**: {{ caution_message }}\n{% endif %}\n\nFor more information, check the documentation at {{ documentation_link }}.\n\n{% if has_related_commands %}\nRelated commands:\n{% for cmd in related_commands %}\n- `{{ cmd }}`\n{% endfor %}\n{% endif %}"
    }
  ],
  "conditionalLogic": {
    "roleBasedLogic": "def generate_response(user_role, action, context):\n    if user_role == \"Software Engineer\":\n        if action in [\"restart_pod\", \"scale_deployment\", \"update_config\"]:\n            return templates.get(\"software_engineer_restricted\").render(\n                action=action,\n                read_only_instructions=get_readonly_instructions(action),\n                documentation_link=get_documentation_link(action)\n            )\n        else:\n            return templates.get(\"software_engineer_default\").render(\n                action=action,\n                step_1=get_step(action, 1),\n                step_2=get_step(action, 2),\n                step_3=get_step(action, 3),\n                documentation_link=get_documentation_link(action)\n            )\n    \n    elif user_role == \"DevOps Engineer\":\n        command = get_command_for_action(action)\n        has_caution = is_caution_needed(action)\n        \n        return templates.get(\"devops_engineer_default\").render(\n            action=action,\n            command=command,\n            has_caution=has_caution,\n            caution_message=get_caution_message(action) if has_caution else \"\",\n            documentation_link=get_documentation_link(action),\n            has_related_commands=has_related_commands(action),\n            related_commands=get_related_commands(action) if has_related_commands(action) else []\n        )",
    "permissionBasedLogic": "def check_permissions(user, action, resource):\n    # Check if user has permission for the action on the resource\n    if not has_permission(user, action, resource):\n        if action == \"view\":\n            return templates.get(\"permission_denied_view\").render(\n                resource=resource,\n                request_access_link=get_access_request_link(resource)\n            )\n        elif action in [\"edit\", \"delete\", \"create\"]:\n            return templates.get(\"permission_denied_modify\").render(\n                action=action,\n                resource=resource,\n                alternative_action=get_alternative_action(action, resource),\n                request_access_link=get_access_request_link(resource)\n            )\n        else:\n            return templates.get(\"permission_denied_generic\").render(\n                action=action,\n                resource=resource,\n                contact=get_resource_owner(resource)\n            )\n    \n    # User has permission, proceed with normal response\n    return None  # Continue with normal response generation"
  },
  "helperFunctions": {
    "permissionHelpers": "def has_permission(user, action, resource):\n    # Check user permissions against resource ACLs\n    return user.permissions.get(resource, {}).get(action, False)\n\ndef get_resource_owner(resource):\n    # Return the owner/contact for a resource\n    return resource_metadata.get(resource, {}).get(\"owner\", \"support@company.com\")\n\ndef get_access_request_link(resource):\n    # Generate access request link\n    return f\"https://access.company.com/request?resource={resource}\"",
    "contentHelpers": "def get_command_for_action(action):\n    # Return command for specific action\n    commands = {\n        \"restart_pod\": \"kubectl rollout restart deployment/{deployment}\",\n        \"scale_deployment\": \"kubectl scale deployment/{deployment} --replicas={count}\",\n        \"update_config\": \"kubectl apply -f {config_file}\"\n    }\n    return commands.get(action, \"echo 'Command not found'\")\n\ndef get_documentation_link(action):\n    # Return documentation link for action\n    docs = {\n        \"restart_pod\": \"https://docs.company.com/kubernetes/restart\",\n        \"scale_deployment\": \"https://docs.company.com/kubernetes/scale\",\n        \"update_config\": \"https://docs.company.com/kubernetes/config\"\n    }\n    return docs.get(action, \"https://docs.company.com/search?q=\" + action)"
  },
  "settings": {
    "responseFormat": {
      "enableMarkdown": true,
      "syntaxHighlighting": true,
      "allowEmojis": true
    },
    "maxResponseLength": 2000,
    "permissionHandling": {
      "strictPermissionChecking": true,
      "showPermissionWarnings": true,
      "suggestAlternativeActions": true
    },
    "defaultResponseMode": "helpful"
  }
}
```

#### Update Generator Configuration

Updates the generator configuration.

**Endpoint**: `PUT /rag/generator`

**Request Body**: Same structure as the GET response

**Response**: `200 OK`

#### Get Context Permissions

Retrieves the context permissions configuration.

**Endpoint**: `GET /rag/context-permissions`

**Response**:
```json
{
  "permissionModel": "role-based",
  "roles": [
    {
      "id": "software-engineer",
      "name": "Software Engineer",
      "permissions": [
        {
          "resource": "kubernetes",
          "actions": ["view", "describe"],
          "restrictions": ["restart", "scale", "delete"]
        },
        {
          "resource": "database",
          "actions": ["query", "view-schema"],
          "restrictions": ["modify", "delete", "create"]
        }
      ]
    },
    {
      "id": "devops-engineer",
      "name": "DevOps Engineer",
      "permissions": [
        {
          "resource": "kubernetes",
          "actions": ["view", "describe", "restart", "scale", "apply"],
          "restrictions": ["delete-namespace"]
        },
        {
          "resource": "database",
          "actions": ["query", "view-schema", "backup"],
          "restrictions": ["drop", "truncate"]
        }
      ]
    }
  ],
  "resourceDefinitions": [
    {
      "id": "kubernetes",
      "name": "Kubernetes Resources",
      "subResources": ["pods", "deployments", "services", "configmaps", "secrets"],
      "sensitivityLevel": "high"
    },
    {
      "id": "database",
      "name": "Database Resources",
      "subResources": ["tables", "views", "procedures", "functions"],
      "sensitivityLevel": "high"
    },
    {
      "id": "monitoring",
      "name": "Monitoring Resources",
      "subResources": ["dashboards", "alerts", "metrics"],
      "sensitivityLevel": "medium"
    }
  ],
  "contextFilters": [
    {
      "id": "pii-filter",
      "name": "PII Filter",
      "enabled": true,
      "patterns": [
        "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b",
        "\\b\\d{3}-\\d{2}-\\d{4}\\b"
      ]
    },
    {
      "id": "api-key-filter",
      "name": "API Key Filter",
      "enabled": true,
      "patterns": [
        "sk-[a-zA-Z0-9]{32,}",
        "api_key[^\\s]*\\s*[:=]\\s*['\"][^'\"]*['\"]"
      ]
    }
  ]
}
```

#### Update Context Permissions

Updates the context permissions configuration.

**Endpoint**: `PUT /rag/context-permissions`

**Request Body**: Same structure as the GET response

**Response**: `200 OK`

#### Test RAG Pipeline

Tests the RAG pipeline with a sample query.

**Endpoint**: `POST /rag/test`

**Request Body**:
```json
{
  "query": "How do I restart a Kubernetes pod?",
  "userRole": "software-engineer",
  "context": {
    "project": "frontend-app",
    "environment": "development"
  }
}
```

**Response**:
```json
{
  "retrievedDocuments": [
    {
      "content": "To restart a pod in Kubernetes, you need to use the kubectl rollout restart command...",
      "metadata": {
        "source": "github",
        "repository": "company/devops-docs",
        "path": "kubernetes/operations.md",
        "lastUpdated": "2025-05-15T10:30:00Z"
      },
      "score": 0.92
    },
    {
      "content": "Pods can be restarted by scaling the deployment to 0 and then back to the original replica count...",
      "metadata": {
        "source": "confluence",
        "space": "DevOps",
        "title": "Kubernetes Troubleshooting Guide",
        "lastUpdated": "2025-04-22T14:15:00Z"
      },
      "score": 0.87
    }
  ],
  "generatedResponse": "Please contact DevOps for restarting a pod. Meanwhile, you can view the pod status using `kubectl get pods` and check logs with `kubectl logs pod-name`.\n\nFor more information, check the documentation at https://docs.company.com/kubernetes/restart.",
  "metrics": {
    "retrievalTime": 0.12,
    "generationTime": 0.85,
    "totalTime": 0.97
  },
  "debug": {
    "retrievalStrategy": "hybrid",
    "embeddingModel": "text-embedding-3-large",
    "generationModel": "gpt-4o",
    "templateUsed": "software-engineer",
    "permissionChecks": [
      {
        "resource": "kubernetes",
        "action": "restart",
        "allowed": false
      }
    ]
  }
}
```

#### Get RAG Logs

Retrieves logs for the RAG system.

**Endpoint**: `GET /rag/logs`

**Query Parameters**:
- `startDate` (optional): Start date for logs (ISO format)
- `endDate` (optional): End date for logs (ISO format)
- `limit` (optional): Maximum number of logs to return
- `offset` (optional): Offset for pagination
- `status` (optional): Filter by status (success, error)

**Response**:
```json
{
  "logs": [
    {
      "id": "log-123456",
      "timestamp": "2025-06-11T08:45:12Z",
      "query": "How do I restart a Kubernetes pod?",
      "userRole": "software-engineer",
      "retrievalTime": 0.12,
      "generationTime": 0.85,
      "status": "success",
      "documentCount": 3
    },
    {
      "id": "log-123455",
      "timestamp": "2025-06-11T08:40:05Z",
      "query": "How to scale a deployment?",
      "userRole": "devops-engineer",
      "retrievalTime": 0.09,
      "generationTime": 0.76,
      "status": "success",
      "documentCount": 2
    }
  ],
  "pagination": {
    "total": 1245,
    "limit": 10,
    "offset": 0
  }
}
```

### Knowledge Base API

#### Get Knowledge Sources

Retrieves all knowledge sources.

**Endpoint**: `GET /knowledge-base/sources`

**Query Parameters**:
- `type` (optional): Filter by source type (github, confluence, slack, google-docs)
- `status` (optional): Filter by status (active, syncing, inactive)
- `search` (optional): Search by name or source

**Response**:
```json
{
  "sources": [
    {
      "id": 1,
      "name": "Frontend Repository",
      "type": "github",
      "source": "company/frontend-app",
      "codeOwners": ["@frontend-team", "@john.doe"],
      "lastSync": "2025-06-11T08:46:08Z",
      "status": "active",
      "documents": 1247,
      "metadata": {
        "repository": "company/frontend-app",
        "branch": "main",
        "path": "/docs",
        "codeOwners": ["@frontend-team", "@john.doe"]
      }
    },
    {
      "id": 2,
      "name": "API Documentation",
      "type": "confluence",
      "source": "Engineering Space",
      "labels": ["api", "backend", "documentation"],
      "lastSync": "2025-06-11T08:33:08Z",
      "status": "active",
      "documents": 89,
      "metadata": {
        "space": "ENG",
        "spaceKey": "engineering",
        "labels": ["api", "backend", "documentation"],
        "parentPage": "API Documentation"
      }
    }
  ],
  "pagination": {
    "total": 8,
    "limit": 10,
    "offset": 0
  }
}
```

#### Create Knowledge Source

Creates a new knowledge source.

**Endpoint**: `POST /knowledge-base/sources`

**Request Body**:
```json
{
  "name": "Backend Repository",
  "type": "github",
  "source": "company/backend-services",
  "metadata": {
    "repository": "company/backend-services",
    "branch": "main",
    "path": "/docs",
    "codeOwners": ["@backend-team", "@jane.smith"]
  }
}
```

**Response**:
```json
{
  "id": 9,
  "name": "Backend Repository",
  "type": "github",
  "source": "company/backend-services",
  "codeOwners": ["@backend-team", "@jane.smith"],
  "lastSync": null,
  "status": "inactive",
  "documents": 0,
  "metadata": {
    "repository": "company/backend-services",
    "branch": "main",
    "path": "/docs",
    "codeOwners": ["@backend-team", "@jane.smith"]
  }
}
```

#### Get Knowledge Source

Retrieves a specific knowledge source.

**Endpoint**: `GET /knowledge-base/sources/{id}`

**Response**:
```json
{
  "id": 1,
  "name": "Frontend Repository",
  "type": "github",
  "source": "company/frontend-app",
  "codeOwners": ["@frontend-team", "@john.doe"],
  "lastSync": "2025-06-11T08:46:08Z",
  "status": "active",
  "documents": 1247,
  "metadata": {
    "repository": "company/frontend-app",
    "branch": "main",
    "path": "/docs",
    "codeOwners": ["@frontend-team", "@john.doe"]
  },
  "syncHistory": [
    {
      "timestamp": "2025-06-11T08:46:08Z",
      "status": "success",
      "documentsAdded": 5,
      "documentsUpdated": 12,
      "documentsRemoved": 2
    },
    {
      "timestamp": "2025-06-10T08:45:12Z",
      "status": "success",
      "documentsAdded": 8,
      "documentsUpdated": 3,
      "documentsRemoved": 0
    }
  ]
}
```

#### Update Knowledge Source

Updates a knowledge source.

**Endpoint**: `PUT /knowledge-base/sources/{id}`

**Request Body**:
```json
{
  "name": "Frontend Repository",
  "type": "github",
  "source": "company/frontend-app",
  "metadata": {
    "repository": "company/frontend-app",
    "branch": "main",
    "path": "/docs",
    "codeOwners": ["@frontend-team", "@john.doe", "@new-member"]
  }
}
```

**Response**: `200 OK`

#### Delete Knowledge Source

Deletes a knowledge source.

**Endpoint**: `DELETE /knowledge-base/sources/{id}`

**Response**: `204 No Content`

#### Sync Knowledge Source

Triggers a sync for a knowledge source.

**Endpoint**: `POST /knowledge-base/sources/{id}/sync`

**Response**:
```json
{
  "id": "sync-123456",
  "sourceId": 1,
  "status": "in_progress",
  "startTime": "2025-06-11T08:55:00Z",
  "estimatedCompletion": "2025-06-11T09:00:00Z"
}
```

#### Get Knowledge Source Documents

Retrieves documents from a knowledge source.

**Endpoint**: `GET /knowledge-base/sources/{id}/documents`

**Query Parameters**:
- `limit` (optional): Maximum number of documents to return
- `offset` (optional): Offset for pagination
- `search` (optional): Search within document content

**Response**:
```json
{
  "documents": [
    {
      "id": "doc-123456",
      "title": "API Authentication Guide",
      "content": "This guide explains how to authenticate with the API...",
      "metadata": {
        "source": "github",
        "repository": "company/frontend-app",
        "path": "/docs/api-auth.md",
        "lastUpdated": "2025-06-01T10:30:00Z"
      },
      "chunks": 5,
      "embedding": "available"
    },
    {
      "id": "doc-123457",
      "title": "Error Handling Best Practices",
      "content": "This document outlines best practices for error handling...",
      "metadata": {
        "source": "github",
        "repository": "company/frontend-app",
        "path": "/docs/error-handling.md",
        "lastUpdated": "2025-05-28T14:15:00Z"
      },
      "chunks": 3,
      "embedding": "available"
    }
  ],
  "pagination": {
    "total": 1247,
    "limit": 10,
    "offset": 0
  }
}
```

#### Get Filter Presets

Retrieves filter presets for knowledge sources.

**Endpoint**: `GET /knowledge-base/filter-presets`

**Response**:
```json
{
  "presets": [
    {
      "name": "Frontend Issues",
      "filters": {
        "type": "github",
        "repository": "company/frontend-app",
        "codeOwners": ["@frontend-team"]
      }
    },
    {
      "name": "API Documentation",
      "filters": {
        "type": "confluence",
        "space": "ENG",
        "labels": ["api"]
      }
    }
  ]
}
```

#### Create Filter Preset

Creates a new filter preset.

**Endpoint**: `POST /knowledge-base/filter-presets`

**Request Body**:
```json
{
  "name": "Backend Issues",
  "filters": {
    "type": "github",
    "repository": "company/backend-services",
    "codeOwners": ["@backend-team"]
  }
}
```

**Response**:
```json
{
  "id": "preset-123456",
  "name": "Backend Issues",
  "filters": {
    "type": "github",
    "repository": "company/backend-services",
    "codeOwners": ["@backend-team"]
  }
}
```

#### Update Response Mapping

Updates the dynamic response mapping configuration.

**Endpoint**: `PUT /knowledge-base/response-mapping`

**Request Body**:
```json
{
  "queryContextMapping": "Define rules for mapping queries to specific knowledge sources based on metadata...",
  "responsePriorityRules": "Set priority rules for responses based on code ownership, space relevance, etc...",
  "autoMapping": true,
  "ownershipPriority": true
}
```

**Response**: `200 OK`

### MCP Servers API

#### Get MCP Servers

Retrieves all MCP servers.

**Endpoint**: `GET /mcp-servers`

**Response**:
```json
{
  "servers": [
    {
      "id": 1,
      "name": "Primary MCP Server",
      "endpoint": "https://mcp-primary.company.com",
      "status": "active",
      "version": "v2.1.0",
      "lastSeen": "2025-06-11T08:46:08Z",
      "connections": 45
    },
    {
      "id": 2,
      "name": "Secondary MCP Server",
      "endpoint": "https://mcp-secondary.company.com",
      "status": "active",
      "version": "v2.1.0",
      "lastSeen": "2025-06-11T08:43:08Z",
      "connections": 23
    },
    {
      "id": 3,
      "name": "Development MCP Server",
      "endpoint": "https://mcp-dev.company.com",
      "status": "inactive",
      "version": "v2.0.8",
      "lastSeen": "2025-06-11T06:48:08Z",
      "connections": 0
    }
  ]
}
```

#### Create MCP Server

Creates a new MCP server.

**Endpoint**: `POST /mcp-servers`

**Request Body**:
```json
{
  "name": "Testing MCP Server",
  "endpoint": "https://mcp-test.company.com",
  "version": "v2.1.0"
}
```

**Response**:
```json
