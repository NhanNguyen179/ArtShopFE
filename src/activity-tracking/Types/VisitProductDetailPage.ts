import { Product } from '../../components/Type';
import BaseEvent, { ActionTypeEnum } from './BaseEvent';

export class VisitProductDetailPage extends BaseEvent {
  constructor(product: Product) {
    super(ActionTypeEnum.VisitProductDetailPage);
    this.Attribute1 = product.id;
    this.Attribute2 = product.name;
    this.Attribute3 = product.category.name;
    this.Attribute4 = product.category.id;
    this.Outcome = `đã xem tranh ${product.name}`;
  }
}

export default VisitProductDetailPage;
