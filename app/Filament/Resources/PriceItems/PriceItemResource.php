<?php

namespace App\Filament\Resources\PriceItems;

use App\Filament\Resources\PriceItems\Pages\CreatePriceItem;
use App\Filament\Resources\PriceItems\Pages\EditPriceItem;
use App\Filament\Resources\PriceItems\Pages\ListPriceItems;
use App\Filament\Resources\PriceItems\Schemas\PriceItemForm;
use App\Filament\Resources\PriceItems\Tables\PriceItemsTable;
use App\Models\PriceItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PriceItemResource extends Resource
{
    protected static ?string $model = PriceItem::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return PriceItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PriceItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPriceItems::route('/'),
            'create' => CreatePriceItem::route('/create'),
            'edit' => EditPriceItem::route('/{record}/edit'),
        ];
    }
}
