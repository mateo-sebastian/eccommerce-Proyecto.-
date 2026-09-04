require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/productos', require('./routes/productos'));
app.use('/api/carrito', require('./routes/carrito'));
app.use('/api/auth', require('./routes/auth'));

const cargarProductosPrueba = async () => {
  const Producto = require('./models/Producto');
  const total = await Producto.countDocuments();
  
  if (total === 0) {
    const productos = [
      // --- ESTILO SKATE (SK8) ---
      {
        nombre: "Pantalón Baggy Oversized Dark Denim",
        descripcion: "Jeans anchos de corte noventero ideal para patinar con total libertad.",
        precio: 48.00,
        stock: 12,
        estilo: "sk8",
        categoria: "Pantalones",
        tallas: ["30", "32", "34", "36"],
        imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmsxkRSY2VuWlNGgvzcqFrBOX19Z7WNAZZ9WLy8FJgUURqkQ-omU-FxS4&s=10"
      },
      {
        nombre: "Polera Boxy Fit Flame Graphic",
        descripcion: "Camiseta de algodón pesado con estampado de flamas en la espalda.",
        precio: 32.50,
        stock: 15,
        estilo: "sk8",
        categoria: "Camisetas",
        tallas: ["S", "M", "L", "XL"],
        imagenUrl: "https://atmosferabrand.cl/cdn/shop/files/C895FBC9-D4C9-4F6B-9DA0-FC2D64C27177.jpg?v=1778210712&width=1946"
      },
      {
        nombre: "Gorro Beanie Ribbed Sk8",
        descripcion: "Gorro de lana acanalada color negro para uso diario.",
        precio: 18.00,
        stock: 20,
        estilo: "sk8",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://i.ebayimg.com/images/g/2osAAOSw6-9iglv9/s-l400.jpg"
      },
      {
        nombre: "Pantalones vaqueros sk8",
        descripcion: "Punk Rock, Hip Hop, bordados, Retro, holgados, pantalones de pierna ancha de cintura alta",
        precio: 52.00,
        stock: 8,
        estilo: "sk8",
        categoria: "Pantalones",
        tallas: ["30", "32", "34"],
        imagenUrl: "https://i5.walmartimages.com/asr/220a65f5-bb4c-4678-a64c-620845522a12.a358659fe12156decdbaaf654b3a9450.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
      },
      {
        nombre: "Camiseta Y2K para hombre, ropa gótica, Hip Hop, Vintage.",
        descripcion: "Cuello redondo, gran tamaño, manga corta, Tops informales, ropa de calle",
        precio: 25.00,
        stock: 10,
        estilo: "sk8",
        categoria: "Camisetas",
        tallas: ["S", "M", "L", "XL"],
        imagenUrl: "https://ae01.alicdn.com/kf/Sfdae359f51f84591b34bce51a348cf71k/Camiseta-Y2K-de-afliction-para-hombre-y-mujer-camisa-de-gran-tama-o-con-cuello-redondo.jpg"
      },
      {
        nombre: "Gorra Trucker Mesh Patch",
        descripcion: "Gorra estilo camionero con malla trasera transpirable.",
        precio: 22.00,
        stock: 14,
        estilo: "sk8",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Short Cargo Heavy Cotton",
        descripcion: "Pantalón corto holgado con múltiples bolsillos laterales.",
        precio: 38.00,
        stock: 9,
        estilo: "sk8",
        categoria: "Pantalones",
        tallas: ["S", "M", "L"],
        imagenUrl: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Camisa Leñadora Oversized Plaid",
        descripcion: "Camisa de franela a cuadros para usar abierta o abotonada.",
        precio: 45.00,
        stock: 11,
        estilo: "sk8",
        categoria: "Camisetas",
        tallas: ["M", "L", "XL"],
        imagenUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Medias Altas Striped Skater",
        descripcion: "Pack de 3 pares de calcetines de algodón con rayas superiores.",
        precio: 15.00,
        stock: 25,
        estilo: "sk8",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Chaquetón Worker Canvas Jacket",
        descripcion: "Chaqueta de trabajo en lona resistente con cuello de pana.",
        precio: 85.00,
        stock: 6,
        estilo: "sk8",
        categoria: "Chaquetas",
        tallas: ["M", "L", "XL"],
        imagenUrl: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Jeans Baggy Washed Grey",
        descripcion: "Pantalón de mezclilla gris desgastado tiro alto.",
        precio: 49.90,
        stock: 8,
        estilo: "sk8",
        categoria: "Pantalones",
        tallas: ["30", "32", "34"],
        imagenUrl: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Camiseta Skeleton Board Print",
        descripcion: "Graphic tee con ilustración gráfica estilo skate callejero.",
        precio: 29.00,
        stock: 18,
        estilo: "sk8",
        categoria: "Camisetas",
        tallas: ["S", "M", "L", "XL"],
        imagenUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=500"
      },

      // --- ESTILO Y2K ---
      {
        nombre: "Baby Tee Strass Cyber Cyberstar",
        descripcion: "Camiseta corta ajustada con estampado en pedrería brillante estilo 2000s.",
        precio: 28.50,
        stock: 14,
        estilo: "y2k",
        categoria: "Tops",
        tallas: ["XS", "S", "M"],
        imagenUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Pantalón Parachute Metallic Silver",
        descripcion: "Pantalón técnico holgado con cordones ajustables en tobillos.",
        precio: 62.00,
        stock: 7,
        estilo: "y2k",
        categoria: "Pantalones",
        tallas: ["S", "M"],
        imagenUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Gafas Cyberstar Frameless Tinted",
        descripcion: "Lentes envolventes estilo futurista de los 2000s sin marco.",
        precio: 24.00,
        stock: 16,
        estilo: "y2k",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Top Crop Halter Metallic Pink",
        descripcion: "Top de tirantes cruzados con acabado brillante satinado.",
        precio: 26.00,
        stock: 10,
        estilo: "y2k",
        categoria: "Tops",
        tallas: ["XS", "S", "M"],
        imagenUrl: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Falda Cargo Micro Mini",
        descripcion: "Falda plisa ajustada con bolsillos de parche y broche metalizado.",
        precio: 36.00,
        stock: 9,
        estilo: "y2k",
        categoria: "Pantalones",
        tallas: ["S", "M"],
        imagenUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Chaqueta Velour Tracksuit Zip",
        descripcion: "Chaqueta de terciopelo suave con cierre frontal cromado.",
        precio: 58.00,
        stock: 8,
        estilo: "y2k",
        categoria: "Chaquetas",
        tallas: ["S", "M", "L"],
        imagenUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Cinturón de Remaches Doble O-Ring",
        descripcion: "Cinturón sintético con ojaletes metálicos en toda la correa.",
        precio: 19.50,
        stock: 22,
        estilo: "y2k",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Bolso Baguette Patent Leather",
        descripcion: "Cartera pequeña para hombro en acabado charol brillante.",
        precio: 34.00,
        stock: 12,
        estilo: "y2k",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Jeans Low-Rise Flare Rhinestone",
        descripcion: "Pantalón tiro bajo acampanado con detalles de cristales en bolsillos.",
        precio: 54.00,
        stock: 7,
        estilo: "y2k",
        categoria: "Pantalones",
        tallas: ["30", "32"],
        imagenUrl: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Chaqueta Puffer Crop Metallic",
        descripcion: "Chaqueta acolchada corta estilo plumón en tono metalizado.",
        precio: 75.00,
        stock: 5,
        estilo: "y2k",
        categoria: "Chaquetas",
        tallas: ["S", "M"],
        imagenUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Top Mesh Mesh Transparent Graphic",
        descripcion: "Camiseta de malla translúcida con estampado gráfico Cyber.",
        precio: 25.00,
        stock: 13,
        estilo: "y2k",
        categoria: "Tops",
        tallas: ["XS", "S", "M"],
        imagenUrl: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Gargantilla Choker Butterfly Star",
        descripcion: "Collar pegado al cuello con dijes metálicos de mariposa y estrella.",
        precio: 16.00,
        stock: 18,
        estilo: "y2k",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=500"
      },

      // --- ESTILO GÓTICO ---
      {
        nombre: "Hoodie Oversized Dark Harness",
        descripcion: "Buzo negro pesado con detalles de arnés y argollas metálicas.",
        precio: 55.00,
        stock: 10,
        estilo: "gotico",
        categoria: "Hoodies",
        tallas: ["M", "L", "XL"],
        imagenUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Chaqueta Biker Pentagram Leather",
        descripcion: "Chaqueta sintética estilo cuero con parches oscuros y cierres.",
        precio: 89.99,
        stock: 6,
        estilo: "gotico",
        categoria: "Chaquetas",
        tallas: ["S", "M", "L"],
        imagenUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Botas Plataforma Bat Buckles 8cm",
        descripcion: "Botas altas con suela dentada gruesa y hebillas metálicas.",
        precio: 110.00,
        stock: 5,
        estilo: "gotico",
        categoria: "Calzado",
        tallas: ["38", "39", "40"],
        imagenUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Corset Underbust Faux Leather",
        descripcion: "Corsé estructurado de cuero sintético con cordones ajustables.",
        precio: 42.00,
        stock: 8,
        estilo: "gotico",
        categoria: "Tops",
        tallas: ["S", "M"],
        imagenUrl: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Camisa Mesh Transparent Gothic",
        descripcion: "Camisa manga larga en tul negro para capas oscuras.",
        precio: 30.00,
        stock: 15,
        estilo: "gotico",
        categoria: "Camisetas",
        tallas: ["S", "M", "L"],
        imagenUrl: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Falda Tablada Pleated Chains",
        descripcion: "Falda plisa con cadenas laterales removibles y broches.",
        precio: 38.50,
        stock: 11,
        estilo: "gotico",
        categoria: "Pantalones",
        tallas: ["S", "M", "L"],
        imagenUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Gargantilla Spike Choker Leather",
        descripcion: "Gargantilla de cuero negro con picos metálicos de acero.",
        precio: 18.00,
        stock: 20,
        estilo: "gotico",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1611591475281-8d2813298816?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Tapado Trench Coat Velvet Dark",
        descripcion: "Abrigo largo de terciopelo pesado con solapas anchas.",
        precio: 125.00,
        stock: 4,
        estilo: "gotico",
        categoria: "Chaquetas",
        tallas: ["M", "L", "XL"],
        imagenUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Vestido Lace Victorian Gothic",
        descripcion: "Vestido negro con mangas acampanadas y bordado en encaje.",
        precio: 68.00,
        stock: 6,
        estilo: "gotico",
        categoria: "Tops",
        tallas: ["S", "M", "L"],
        imagenUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Pantalón Bondage Strap Pants",
        descripcion: "Pantalón holgado con tiras colgantes y cierres decorativos.",
        precio: 59.00,
        stock: 7,
        estilo: "gotico",
        categoria: "Pantalones",
        tallas: ["30", "32", "34"],
        imagenUrl: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Guantes Largos Lace Fingerless",
        descripcion: "Guantes de encaje sin dedos hasta el codo.",
        precio: 15.00,
        stock: 18,
        estilo: "gotico",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1516762689617-e1cffffd478d?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Anillo Skull Claw Silver",
        descripcion: "Anillo ajustable de aleación de zinc en forma de garra esquelética.",
        precio: 14.00,
        stock: 30,
        estilo: "gotico",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Sudadera Oversized Skeleton Zip",
        descripcion: "Chaqueta con capucha y gráfico de costillas en impresión blanca.",
        precio: 52.00,
        stock: 9,
        estilo: "gotico",
        categoria: "Hoodies",
        tallas: ["M", "L", "XL"],
        imagenUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=500"
      },
      {
        nombre: "Sombrero Wide Brim Witchy",
        descripcion: "Sombrero de ala ancha en lana negra rígida.",
        precio: 35.00,
        stock: 8,
        estilo: "gotico",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=500"
      },

      // --- MIXTO / EDICIONES ESPECIALES ---
      {
        nombre: "Chaqueta Hybrid Denim & Leather",
        descripcion: "Combinación de mangas de cuero con cuerpo de mezclilla deshilachada.",
        precio: 95.00,
        stock: 5,
        estilo: "sk8",
        categoria: "Chaquetas",
        tallas: ["M", "L"],
        imagenUrl: "https://www.ubuy.cr/es/productde/TN0T68NIO-cipo-baxx-men-s-hybrid-denim-jacket-series-classic-denim-leather-sport-various-jacket-models-button-and-zip-sweat-hood-and-sweat?srsltid=AfmBOornsRxvKj2xFhvthsoTrgvuPkRRqgMiqm-J-96YF63oMC2G6x5D"
      },
      {
        nombre: "Bolso Crossbody Utility Harness",
        descripcion: "Banano pectoral táctico con múltiples compartimentos.",
        precio: 39.00,
        stock: 14,
        estilo: "y2k",
        categoria: "Accesorios",
        tallas: ["Única"],
        imagenUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500"
      }
    ];

    await Producto.insertMany(productos);
    console.log('🚀 ¡40 prendas reales con imágenes acordes cargadas en MongoDB Atlas!');
  }
};

const iniciarServidor = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado exitosamente a MongoDB Atlas');

    await cargarProductosPrueba();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB Atlas:', error);
  }
};

iniciarServidor();