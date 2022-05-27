const products = [
  {
    name: 'Saree Mall Floral Saree',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.mPth4OBPQyP1k7UZW49E0QHaJ4%26pid%3DApi&f=1',
    description:
      'Dress up or dress down this modish saree for any ethnic function. It includes a captivating organza blouse and fabric to add a touch of charm to your appearanceThe saree comes with an unstitched blouse piece The blouse worn by the model might be for modelling purpose only.Check the image of the blouse piece to understand how the actual blouse piece looks like',
    brand: 'Saree Mall',
    category: 'Saree',
    price: 1043,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Red & Gold-Toned Woven Design Bandhani Saree',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.dXF4uoeHPTa6wt2RoCnTuwHaJ4%26pid%3DApi&f=1',
    description:
      `Red and gold-toned bandhani saree
      Woven design woven design saree with embroidered border
      The saree comes with an unstitched blouse piece, The blouse worn by the model might be for modelling purpose only`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Maroon & Gold Ethnic Motifs Zari Silk Blend Banarasi Saree',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.WJ7b0TrkieU5BTb9NfRAtwHaLH%26pid%3DApi&f=1',
    description:
      `Maroon and gold-toned banarasi saree
      Ethnic motifs woven design saree with woven design border
      Has zari detail
      
      The saree comes with an unstitched blouse piece
      
      The blouse worn by the model might be for modelling purpose only. Check the image of the blouse piece to understand how the actual blouse piece looks like.`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Pink & Navy Blue Striped Sequinned Floral Applique Saree',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.5i0Fh5ZpN4A2y7zKYjOosAHaKt%26pid%3DApi&f=1',
    description:
    `Pink and navy blue saree
    Striped and floral applique saree with solid border
    Has sequinned detail
    Disclaimer: The saree comes with an unstitched blouse piece
    The blouse worn by the model might be for modelling purpose only. Check the image of the blouse piece to understand how the actual blouse piece looks like.`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 799.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Magenta Silk Blend Woven Design Banarasi Saree',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.oImFN19lVv-q6BlBU1u63gHaLH%26pid%3DApi&f=1',
    description:
      `Magenta banarasi woven design saree and has a solid border
      Blouse Piece
      The model is wearing a stitched version of the blouse`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 1449.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Ethnic Motifs Silk Blend Saree with Woven Design border',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8mTZkiCdYylqaG9LHrhkJgHaLG%26pid%3DApi&f=1',
    description:
      `Amp up your saree collection with this ever-so-beautiful piece. It is highlighted by an appealing woven design border and a graceful-looking ethnic print. 
      Off-white woven design saree
      Ethnic motifs
      Woven design border
      Silk blend blouse
      Silk blend, dry clean
      The model is wearing the stitched blouse that comes with the saree.`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 1129.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Off White & Pink Floral Silk Blend Saree',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.EHesgccmEohTkq3XPDKPkgHaJ4%26pid%3DApi&f=1',
    description:
    `Off white and pink saree
    Floral woven design saree with woven design border
    
    The saree comes with an unstitched blouse piece
    The blouse worn by the model might be for modelling purpose only. Check the image of the blouse piece to understand how the actual blouse piece looks like.`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 1039.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Mustard Party Wear Saree with Matching Blouse',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.qpyVVwoY0wDJUZd43xARywHaJ2%26pid%3DApi&f=1',
    description:
    `An ideal choice for a special occasion, this lovely saree is a charmer. Designed with a classic solid pattern and an eye-catching solid border it adds beauty to your looks.
    Creamy mustard saree
    Solid pattern
    Solid border
    Velvet blouse piece
    Poly georgette, dry clean`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 1999.99,
    countInStock: 6,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Teal Blue Solid Accordian Pleat Ruffles Saree with Embroidered Blouse',
    image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.IIBjNPTaZVmGOoUJEPLE6wHaLG%26pid%3DApi&f=1',
    description:
    `Teal blue ruffle accordion pleat saree`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 999.99,
    countInStock: 6,
    rating: 4,
    numReviews: 12,
  },
  {
    name: 'Pink & Silver-Toned Paisley Zari Silk Blend Banarasi Saree',
    image: ' https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9g8wnprux8wb_bP9k-ifwwHaKL%26pid%3DApi&f=1',
    description:
    `Pink and silver-toned banarasi saree
    Paisley woven design saree with zari border
    Has zari detail
    
    The saree comes with an unstitched blouse piece
    The blouse worn by the model might be for modelling purpose only. Check the image of the blouse piece to understand how the actual blouse piece looks like.`,
    brand: 'Saree Mall',
    category: 'Saree',
    price: 899.99,
    countInStock: 6,
    rating: 4,
    numReviews: 12,
  },
]
export default products