pipeline{
    environment {
        /* Jenkins Pipeline Setup */
        registry = 'registry.stg.skcloud.io/peacec/peacec-frontend'
        registryCredentialId = 'cloudzharbor-credential'
        repository = 'https://github.com/cloudsvcdev/peacec-frontend.git'
        repositoryCredentialId = 'git-ssh-credential'
        dockerImage = ''
    }
    agent any
    stages{
        stage('Cloning Git'){
            steps {
                git(
                    url: repository,
                    credentialsId: repositoryCredentialId
                )
            }
        }
        stage('Build Image') {
            steps {
                dockerImage = docker.build registry + ':$BUILD_NUMBER'
            }
        }
        stage('Deploy Image') {
            steps {
                script {
                    docker.withRegistry('', registryCredentialId) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove unused docker image') {
            steps {
                sh 'docker rmi $registry:$BUILD_NUMBER'
            }
        }
    }
}