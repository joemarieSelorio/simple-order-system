import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call ordersService.createOrder with correct parameters', async () => {
      const createOrderDto: CreateOrderDto = {
        productName: 'Test Product',
        quantity: 2,
      };

      const mockRequest = {
        user: {
          uuid: 'user-uuid-123',
        },
      } as unknown as Request;

      const result = {
        id: 1,
        productName: 'Test Product',
        userId: 'user-uuid-123',
        quantity: 2,
        uuid: 'order-uuid-123',
        order_number: 'order-123',
        product_uuid: 'product-uuid-123',
        user_uuid: 'user-uuid-123',
      };
      jest.spyOn(ordersService, 'createOrder').mockResolvedValue(result);

      expect(await controller.create(createOrderDto, mockRequest)).toBe(result);
      expect(ordersService.createOrder).toHaveBeenCalledWith(
        createOrderDto.productName,
        'user-uuid-123',
        createOrderDto.quantity,
      );
    });
  });
});
