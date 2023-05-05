import { Module, DynamicModule } from "@nestjs/common"
import { ProductService } from "./services/product.service"



export interface ClientModuleOptions {
    isGlobal: boolean
}

@Module({})
export class ClientModule {
    static Regiester(Options: ClientModuleOptions): DynamicModule {
        return {
            global: Options.isGlobal || false,
            module: ClientModule,
            providers: [ProductService],
            exports: [ProductService]
        }
    }
}