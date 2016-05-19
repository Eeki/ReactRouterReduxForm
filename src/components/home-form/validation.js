function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const validateHomeFormFirstPage = values => {
  const errors = {};
  if (!values.address) errors.address = 'Osoite on pakollinen tieto';
  if (!values.city) errors.city = 'Ole hyvä ja valitse kaupunki';
  if (!values.neighborhood) errors.neighborhood = 'Valitse kaupunginosa';
  if (!values.zipCode) {
    errors.zipCode = 'Postinumero on pakollinen tieto'
  } else if (values.zipCode.length !== 5 || !isNumeric(values.zipCode)) {
    errors.zipCode = 'Postinumeron pitää olla viisi numeroinen luku'
  }
  return errors
};

export const validateHomeFormSecondPage = values => {
  const errors = {};
  if(!values.title) errors.title = 'Ilmotuksen otsikko on pakollinen';
  if(!values.description) errors.description = 'Ole hyvä ja kirjoita esittelyteksti';
  if (!values.rent) {
    errors.rent = 'Paljonko pyydät vuokraa?'
  } else if (!isNumeric(values.rent)) {
    errors.rent = 'Ilmoita vuokran suuruus numeroina'
  }
  if(!values.deposit) errors.deposit = 'Miten suuren vuokraavakuuden haluat?';
  if (!values.livingArea) {
    errors.livingArea = 'Ilmoita asuinpinta-ala?'
  } else if (!isNumeric(values.livingArea)) {
    errors.livingArea = 'Ole hyvä ja ilmoita asuinpinta-ala numeroina'
  }
  if (!values.numberOfRooms) {
    errors.numberOfRooms = 'Kuinka monta huonetta asunnossa on?'
  } else if (!isNumeric(values.numberOfRooms)) {
    errors.numberOfRooms = 'Ole hyvä ja ilmoita huoneiden määrä numeroina'
  }
  if(!values.kitchenType) errors.kitchenType = 'Valitse keittiön tyyppi';
  if(!values.sauna) errors.sauna = 'Onko asunnossa sauna?';
  if(!values.balcony) errors.balcony = 'Onko asunnossa parveketta?';
  if (!values.rooms) errors.rooms = 'Ilmoita asunnon huoneet esim 2h+k';
  return errors
};
