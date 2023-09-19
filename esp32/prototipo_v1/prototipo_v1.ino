#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "FAMILIA RIVEROS";
const char* password = "riveros2021";
const char* mqtt_server = "test.mosquitto.org"; // Por ejemplo, "mqtt.eclipse.org"
const int mqtt_port = 1883; // Puerto MQTT predeterminado

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a la red WiFi");

  client.setServer(mqtt_server, mqtt_port);
  // Puedes definir funciones de callback para recibir mensajes entrantes
  client.setCallback(callback);
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido en el topic: ");
  Serial.println(topic);
  Serial.print("Contenido: ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Conectando al broker MQTT...");
    if (client.connect("ESP32Client")) {
      Serial.println("Conexión exitosa al broker MQTT");
      // Suscríbete a un topic
      client.subscribe("familyandfriends/#");
    } else {
      Serial.print("Error de conexión, rc=");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos...");
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  // Publica un mensaje en un topic
  client.publish("familyandfriends/msg", "Hola desde ESP32");
  delay(5000); // Espera 5 segundos antes de publicar otro mensaje
  client.loop(); // Mantén la conexión MQTT activa
}
