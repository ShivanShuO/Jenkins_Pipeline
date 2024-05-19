pipeline {
    agent any

    environment {
        GO_VERSION = '1.16'
        NODE_VERSION = '14'
        PHP_VERSION = '7.4'
        DOCKER_REGISTRY = 'your-docker-registry'
    }

    stages {
        stage('Setup') {
            steps {
                script {

                    sh "sudo rm -rf /usr/local/bin/composer"
                    // Ensure the necessary tools are available
                    sh 'go version || curl -sSL https://golang.org/dl/go${GO_VERSION}.linux-amd64.tar.gz | sudo tar -C /usr/local -xzf -'
                    sh 'node -v || curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash - && sudo apt-get install -y nodejs'
                    sh 'php -v || sudo apt-get install -y php${PHP_VERSION} php${PHP_VERSION}-cli php${PHP_VERSION}-xml'
                    sh 'composer -v || sudo curl -sS https://getcomposer.org/installer | php && sudo mv composer.phar /usr/local/bin/composer'
                }
            }
        }

        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                sh """git clone https://github.com/ShivanShuO/Jenkins_Pipeline.git .
                    ls -trlh"""
                
            }
        }


        stage('Lint and Test Next.js') {
            steps {
                dir('nextjs') {
                    sh 'npm install'
                    sh 'npm run lint'
                    sh 'npm test'
                }
            }
        }

        stage('Lint and Test WordPress') {
            steps {
                dir('wordpress') {
                    sh 'composer install'
                    sh 'composer require --dev squizlabs/php_codesniffer'
                    sh './vendor/bin/phpcs --config-set installed_paths /path/to/wpcs'
                    sh './vendor/bin/phpcs -i'
                    sh './vendor/bin/phpcs --standard=WordPress .'
                }
            }
        }
        stage('Lint and Test Go') {
            steps {
                dir('go') {
                    sh 'go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest'
                    sh 'golangci-lint run'
                    sh 'go test ./...'
                }
            }
        }
        stage('Build Docker Images') {
            parallel {
                stage('Build Go Docker Image') {
                    steps {
                        dir('go') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/myapp-go:latest", ".")
                            }
                        }
                    }
                }
                stage('Build Next.js Docker Image') {
                    steps {
                        dir('nextjs') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/myapp-nextjs:latest", ".")
                            }
                        }
                    }
                }
                stage('Build WordPress Docker Image') {
                    steps {
                        dir('wordpress') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/myapp-wordpress:latest", ".")
                            }
                        }
                    }
                }
            }
        }

        stage('Push Docker Images') {
            parallel {
                stage('Push Go Docker Image') {
                    steps {
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                                docker.image("${DOCKER_REGISTRY}/myapp-go:latest").push()
                            }
                        }
                    }
                }
                stage('Push Next.js Docker Image') {
                    steps {
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                                docker.image("${DOCKER_REGISTRY}/myapp-nextjs:latest").push()
                            }
                        }
                    }
                }
                stage('Push WordPress Docker Image') {
                    steps {
                        script {
                            docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                                docker.image("${DOCKER_REGISTRY}/myapp-wordpress:latest").push()
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.staging.yml up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
    }
}

