def label = "kaniko-${UUID.randomUUID().toString()}"

podTemplate(name: 'kaniko', label: label, yaml: """
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
  imagePullSecrets:
  - name: regcred
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
      git 'https://github.com/sloools/jenkins-front'
      container(name: 'kaniko', shell: '/busybox/sh') {
          echo "hello world" 
    }
    }
  }
}
