#!/usr/bin/env groovy
pipeline {
  agent any
  tools {
    nodejs 'nodejs'
  }
  environment {
    CI = 'true'
  }
  options {
    timestamps()
  }
  stages {
    stage('Install') {
      options {
        timeout(time: 1, unit: 'MINUTES')
      }
      steps {
        sh 'npm ci'
      }
    }
    stage('Quality check') {
      parallel {
        stage('Eslint') {
          steps {
            sh 'npm run eslint:error'
          }
        }
        stage('Flow') {
          steps {
            sh 'npx flow'
          }
        }
        stage('unit test') {
          steps {
            sh 'npm test'
          }
        }
      }
    }
    stage('Deploy') {
      parallel {
        stage('to production') {
          when {
            branch 'master'
          }
          steps {
            build job: 'the-asia-web-production', wait: false
          }
        }
        stage('to staging') {
          when {
            branch 'develop'
          }
          steps {
            build job: 'the-asia-web-staging', wait: false
          }
        }
      }
    }
  }
}
