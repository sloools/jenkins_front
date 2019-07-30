def label = "kaniko-${UUID.randomUUID().toString()}"

podTemplate(name: 'kaniko', yaml: """
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    imagePullPolicy: Always
    command:
    - /busybox/cat
    tty: true
    volumeMounts:
      - name: jenkins-docker-cfg
        mountPath: /root
  volumes:
  - name: jenkins-docker-cfg
    projected:
      sources:
      - secret:
          name: regcred
          items:
            - key: .dockerconfigjson
              path: .docker/config.json
"""              
  ) {

  node {
    stage('Build with Kaniko') {
      git 'https://github.com/sloools/jenkins_front.git'
      container(name: 'kaniko', shell: '/busybox/sh') {
          sh '''#!/busybox/sh
          /kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure-skip-tls-verify --destination=https://harbor.ops.action.cloudz.co.kr/intern_test/my-first-node          '''
      }
    }
  }
}
