const express = require('express');
const router = express.Router();
const mqtt = require('mqtt');

const protocol = 'mqtt';
const host = 'test.mosquitto.org'; // Cambia esto al servidor MQTT al que quieras conectarte
const port = '1883';
const topicToPublish = 'familyandfriends/led';

const connectUrl = `${protocol}://${host}:${port}`;
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('Connected to MQTT server');
});

client.on('error', (error) => {
  console.error('Error de conexión MQTT:', error);
});

// Ruta para manejar la solicitud POST a /api/start
router.post('/start', (req, res) => {
  const { mensaje } = req.body;

  // Publicar un mensaje MQTT
  client.publish(topicToPublish, mensaje, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error('Error al publicar:', error);
      res.status(500).json({ mensaje: 'Error al publicar mensaje MQTT' });
    } else {
      console.log(`Mensaje publicado en ${topicToPublish}: ${mensaje}`);
      res.json({ mensaje: 'Mensaje MQTT enviado con éxito' });
    }
  });
});

module.exports = router;
