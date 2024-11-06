node {
    def slackResponse = send("STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")

    stage('Syncing Code from GitHub') {
        checkout scm
    }

    stage('Build Image') {
        sh label: 'build', script: 'docker build -t makerspace-frontend:latest .'
        reply("BUILD SUCCESSFUL: <@UEWEG106N>: Frontend build for makerspace-frontend is successful.", slackResponse.threadId, color='#e33d3d')
    }

    stage('Stop Old Build') {
        sh label: 'remove', script: 'docker stop makerspace-frontend || true && docker rm makerspace-frontend || true'
    }

    stage('Run Container') {
        sh label: 'run', script: 'docker run --rm -d --name makerspace-frontend -p 4200:4200 makerspace-frontend:latest'
    }

    stage('Remove Extra Images') {
        sh label: 'remove', script: 'docker image prune -f -a'
    }

    reply("JOB COMPLETED: <@UEWEG106N>, makerspace-frontend is back online and accessible at http://localhost:4200.", slackResponse.threadId, color='#5ba50b')
}

def send(String message='Started', String color='#FFFF00') {
    return slackSend(channel: "softwareteam", message: message, color: color)
}

def reply(String message, String threadId, String color='#ffb85c') {
    slackSend(
        channel: threadId,
        replyBroadcast: true,
        message: message,
        color: color
    )
}
