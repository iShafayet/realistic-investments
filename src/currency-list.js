const suggestedPriceOfGoldPerGram = 59.83;

export const currencyList = [
  {
    key: "USD",
    label: "United States Dollar",
    sign: "$",
    defaultSuggestedPriceOfGoldPerGram: suggestedPriceOfGoldPerGram,
  },
  {
    key: "EUR",
    label: "Euro",
    sign: "€",
    defaultSuggestedPriceOfGoldPerGram: suggestedPriceOfGoldPerGram * 0.94,
  },
  {
    key: "JPY",
    label: "Japanese Yen",
    sign: "¥",
    defaultSuggestedPriceOfGoldPerGram: suggestedPriceOfGoldPerGram * 129.6,
  },
  {
    key: "GBP",
    label: "Pound Sterling",
    sign: "£",
    defaultSuggestedPriceOfGoldPerGram: suggestedPriceOfGoldPerGram * 0.8,
  },
  {
    key: "BDT",
    label: "Bangladesh Taka",
    sign: "৳",
    defaultSuggestedPriceOfGoldPerGram: suggestedPriceOfGoldPerGram * 86.07,
  },
  {
    key: "ANY",
    label: "Other",
    sign: "¤",
    defaultSuggestedPriceOfGoldPerGram: suggestedPriceOfGoldPerGram * 100,
  },
];
