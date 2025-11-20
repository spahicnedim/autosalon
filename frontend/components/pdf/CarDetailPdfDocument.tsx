"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

interface Car {
  id: number;
  model: string;
  godina: number;
  cijena: number;
  kilometraza: string;
  gorivo: string;
  mjenjac: string;
  zapremina?: number;
  snaga?: number;
  boja?: string;
  oblikKaroserije?: string;
  slike: { url: string }[];
  brend: { naziv: string };
  oprema?: { id: number; oprema: { naziv: string } }[];
}

interface Props {
  car: Car;
  qrCodeDataUrl: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 28,
    fontFamily: "Helvetica",
    color: "#111827",
    fontSize: 10,
    lineHeight: 1.4,
  },
  // === HEADER ===
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 12,
  },
  logo: {
    width: 100,
    height: 35,
    objectFit: "contain",
  },
  contactInfo: {
    textAlign: "right",
    fontSize: 9,
    lineHeight: 1.3,
    color: "#374151",
  },
  // === TITLE ===
  carHeader: {
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 2,
  },
  // === TOP SECTION (IMAGE + SPECS) ===
  topSection: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  image: {
    width: "60%",
    height: 180,
    borderRadius: 10,
    objectFit: "cover",
  },
  specsContainer: {
    width: "40%",
    borderLeftWidth: 1,
    borderLeftColor: "#E5E7EB",
    paddingLeft: 8,
    justifyContent: "center",
  },
  specItem: {
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#6B7280",
  },
  value: {
    fontWeight: "bold",
  },
  // === SECTIONS ===
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#D62828",
    marginTop: 8,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  equipmentList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  equipmentItem: {
    width: "33%",
    marginBottom: 2,
  },
  // === PRICE ===
  priceSection: {
    textAlign: "center",
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  priceValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D62828",
    marginTop: 3,
  },
  // === QR CODE ===
  qr: {
    alignSelf: "center",
    width: 70,
    height: 70,
    marginTop: 10,
  },
  // === FOOTER ===
  footer: {
    fontSize: 8,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 6,
  },
});

export default function CarDetailsPdfDocument({ car, qrCodeDataUrl }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* === HEADER with logo + contact info === */}
        <View style={styles.header}>
          <Image src="/logo.png" style={styles.logo} />
          <View style={styles.contactInfo}>
            <Text>ILMA doo</Text>
            <Text>Jelah, Bosna i Hercegovina</Text>
            <Text>+387 61 123 456</Text>
            <Text>www.ilmaauto.com</Text>
          </View>
        </View>

        {/* === CAR TITLE === */}
        <View style={styles.carHeader}>
          <Text style={styles.title}>
            {car.brend.naziv} {car.model} - {car.godina}
          </Text>
          {/*<Text style={styles.subtitle}>{car.godina}</Text>*/}
        </View>

        {/* === IMAGE + SPECS === */}
        <View style={styles.topSection}>
          {car.slike?.[0]?.url && (
            <Image src={car.slike[0].url} style={styles.image} />
          )}
          <View style={styles.specsContainer}>
            {[
              ["Motor", car.zapremina ? `${car.zapremina} ccm` : "—"],
              ["Snaga", car.snaga ? `${car.snaga} KS` : "—"],
              ["Vrsta goriva", car.gorivo],
              ["Mjenjač", car.mjenjac],
              ["Kilometraža", car.kilometraza],
              ["Boja", car.boja || "—"],
              ["Karoserija", car.oblikKaroserije || "—"],
            ].map(([label, value], i) => (
              <View key={i} style={styles.specItem}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* === EQUIPMENT === */}
        {car.oprema && car.oprema.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Oprema</Text>
            <View style={styles.equipmentList}>
              {car.oprema.map((item, i) => (
                <View key={i} style={styles.equipmentItem}>
                  <Text>• {item.oprema.naziv}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* === PRICE === */}
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Cijena do registracije:</Text>
          <Text style={styles.priceValue}>
            {car.cijena.toLocaleString()} KM
          </Text>
        </View>

        {/* === QR CODE === */}
        {qrCodeDataUrl && <Image src={qrCodeDataUrl} style={styles.qr} />}

        {/* === FOOTER === */}
        <Text style={styles.footer}>
          ©2025 ILMA doo | Napomena: Podaci na web stranici www.ilmaauto.com su
          informativnog karaktera i podložni su promjeni u svakom trenutku.
        </Text>
      </Page>
    </Document>
  );
}
