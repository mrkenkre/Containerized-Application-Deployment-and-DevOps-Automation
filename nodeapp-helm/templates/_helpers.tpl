# templates/_helpers.tpl

{{/* Define name template */}}
{{- define "nodeapp.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/* Define fullname template */}}
{{- define "nodeapp.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name (include "nodeapp.name" .) | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}