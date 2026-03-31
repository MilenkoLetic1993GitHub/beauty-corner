<?php

namespace App\Filament\Resources\PriceCategories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PriceCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->required()
                ->maxLength(255)
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

            TextInput::make('slug')
                ->required()
                ->maxLength(255)
                ->unique(ignoreRecord: true),

            Textarea::make('description')
                ->rows(3),

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
