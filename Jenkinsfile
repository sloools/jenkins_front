//def label = "kaniko-${UUID.randomUUID().toString()}"

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

  node(POD_LABEL) {
    stage('Build with Kaniko') {
      git 'https://github.com/jenkinsci/docker-jnlp-slave.git'
      container(name: 'kaniko', shell: '/busybox/sh') {
          sh '''#!/busybox/sh
          /kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure-skip-tls-verify --destination=mydockerregistry:5000/myorg/myimage
          '''  
    }
    }
  }
}
