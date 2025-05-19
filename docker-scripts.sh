
#!/bin/bash

case "$1" in
  build)
    docker-compose build
    ;;
  up)
    docker-compose up -d
    ;;
  down)
    docker-compose down
    ;;
  logs)
    docker-compose logs -f
    ;;
  restart)
    docker-compose restart
    ;;
  *)
    echo "Usage: $0 {build|up|down|logs|restart}"
    exit 1
esac
