<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PriceItem extends Model
{
    protected $fillable = [
        'price_category_id',
        'name',
        'description',
        'price',
        'duration_minutes',
        'is_active',
        'sort_order',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(PriceCategory::class, 'price_category_id');
    }
}
