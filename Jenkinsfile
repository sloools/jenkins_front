pipeline{
    environment { 
        registry = "harbor.ops.action.cloudz.co.kr/intern_test"
        registryCredential = 'dockerhub'
        //repository = 'https://github.com/sloools/peacec-frontend.git'
        //repositoryCredentialId = 'git-ssh-credential'
        dockerImage = ''
    }
    agent {
        dockerfile true
    }
    stages{
        stage('Cloning Git'){
            steps {
                git 'https://github.com/sloools/peacec-frontend.git'
            }
        }
        stage('Build Image') {
            steps {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
            }
        }
        stage('Deploy Image') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Remove unused docker image') {
            steps {
                sh "docker rmi $registry:$BUILD_NUMBER"
            }
        }
    }
}