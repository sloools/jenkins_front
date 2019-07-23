pipeline{
    environment { 
        registry = "harbor.ops.action.cloudz.co.kr/intern_test"
        registryCredential = 'dockerhub'
        dockerImage =''
    }
    agent {
        docker { image 'jenkins'}
    }
    stages{
        stage('Cloning Git'){
            steps {
                git 'https://github.com/sloools/peacec-frontend.git'
            }
        }
        stage('Build Image') {
            steps {
                script{
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
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
