<?php

namespace App\Filament\Resources\PriceItems\Schemas;

use App\Models\PriceCategory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PriceItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('price_category_id')
                ->label('Category')
                ->options(PriceCategory::query()->orderBy('sort_order')->pluck('name', 'id'))
                ->searchable()
                ->required(),

            TextInput::make('name')
                ->required()
                ->maxLength(255),

            Textarea::make('description')
                ->rows(3),

            TextInput::make('price')
                ->numeric()
                ->prefix('€'),

            TextInput::make('duration_minutes')
                ->numeric(),

            TextInput::make('sort_order')
                ->numeric()
                ->default(0)
                ->required(),

            Toggle::make('is_active')
                ->default(true)
                ->required(),
        ]);
    }
}
