import { Injectable, NotFoundException } from "@nestjs/common";
import { Client, ClientGrpc, Transport } from "@nestjs/microservices";
import { join } from "path";
import { Product } from "@takimbirprojeler/backend.node.shared.entities";
import { Observable } from "rxjs";

export interface IProductService {
  GetProductById(input: { id: string }): Observable<Product | null>;
  GetProducts(input: {}): Observable<{ products: Product[] }>;
}

@Injectable()
export class ProductService {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: "Product",
      url: "localhost:5000",
      loader: {
        includeDirs: [join(__dirname, "..", "..", "proto")],
      },
      protoPath: join(join(__dirname, "../..", "proto", "product.proto")),
    },
  })
  private client: ClientGrpc;

  private grpcProductService: IProductService;

  onModuleInit() {
    this.grpcProductService =
      this.client.getService<IProductService>("ProductService");
  }

  async GetProductById(input: { id: string }) {
    try {
      return await this.grpcProductService.GetProductById(input);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  GetProducts() {
    return this.grpcProductService.GetProducts({});
  }
}
