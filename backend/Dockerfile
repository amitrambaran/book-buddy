# FROM alpine:latest

# WORKDIR /
# ADD main .
# ADD .env .
# EXPOSE 8080

# ENTRYPOINT [ "./main" ]

FROM golang:1.11 as builder


WORKDIR /go/src/

COPY main.go .
COPY models/ ./models

RUN go get -d github.com/gin-gonic/contrib/static \
  github.com/gin-gonic/gin github.com/gin-contrib/cors \
	github.com/jinzhu/gorm github.com/jinzhu/gorm/dialects/postgres \
	github.com/joho/godotenv

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/main .


FROM alpine:latest  

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=builder /go/bin/main .
ADD .env .
EXPOSE 8080

CMD ["./main"] 
