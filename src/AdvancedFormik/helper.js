export const circuitOptions_data = [
  {
    value: 1,
    label: 'circuit 1',
  },

  {
    value: 3,
    label: 'circuit 2',
  },
  {
    value: 4,
    label: 'circuit 3',
  },
  {
    value: 5,
    label: 'circuit 4',
  },
];

export const roleOptions_data = [
  {
    value: 1,
    label: 'Opérateur',
  },

  {
    value: 3,
    label: "Chef d'atelier",
  },
];

export const equipementOptions_data = [
  {
    value: 1,
    label: 'equipementOptions 1',
  },

  {
    value: 3,
    label: 'equipementOptions 3',
  },
  {
    value: 4,
    label: 'equipementOptions 4',
  },
  {
    value: 5,
    label: 'equipementOptions 5',
  },
];

export const checkPointOptions_data = [
  {
    value: 1,
    label: 'checkPointOptions 1',
  },

  {
    value: 3,
    label: 'checkPointOptions 3',
  },
  {
    value: 4,
    label: 'checkPointOptions 4',
  },
  {
    value: 5,
    label: 'checkPointOptions 5',
  },
];

export const critereOptions_data = [
  {
    value: 1,
    label: 'critereOptions 1',
  },

  {
    value: 3,
    label: 'critereOptions 3',
  },
  {
    value: 4,
    label: 'critereOptions 4',
  },
  {
    value: 5,
    label: 'critereOptions 5',
  },
];

export const getOptions = (elements) => {
  const options = [];

  // eslint-disable-next-line array-callback-return
  elements.map((element) => {
    options.push({
      value: element.id,
      label: element.name,
    });
  });

  return options;
};
