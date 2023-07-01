import { Product } from '../../components/Type';
import { fCurrency } from '../../utils/formatNumber';
import BaseEvent, { ActionTypeEnum } from './BaseEvent';

export class ApprovedAuctionProduct extends BaseEvent {
  constructor(product: Product, priceAuction: number) {
    super(ActionTypeEnum.ApprovedAuctionProduct);
    this.Attribute1 = product.id;
    this.Attribute2 = product.name;
    this.Attribute3 = product.category.name;
    this.Attribute4 = product.category.id;
    this.Attribute5 = priceAuction;
    this.Outcome = `đã được chấp thuận với mức giá ${fCurrency(priceAuction)}`;
  }
}

export default ApprovedAuctionProduct;
